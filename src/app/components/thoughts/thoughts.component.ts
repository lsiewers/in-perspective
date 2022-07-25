import * as p5 from 'p5';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Thought } from '../../classes/thought';
import { Phases } from '../../enums/phases';
import { Subject } from '../../classes/subject';
import { getPhaseKeyText } from '../../functions/convertEnums';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ResizeHandlers } from '../../enums/resize-handlers'
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-thoughts',
  templateUrl: './thoughts.component.html',
  styleUrls: ['./thoughts.component.scss']
})

export class ThoughtsComponent implements OnInit {
  phase!: Phases;
  ready: boolean = false;
  @Output('showReadyBtn') showReadyBtn = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private modalService: ModalService
  ) {
    this.router.events.subscribe((event: Event) => event instanceof NavigationEnd ? this.phase = (Number(event.url[1]) as Phases) : null );
    this.modalService.modalEmitted$.subscribe(open => this.ready = !open);
  }

  ngOnInit(): void { new p5(this.sketch); }

  private sketch = (p: p5) => {
    // objects & elements
    let inputEL: p5.Element;
    let sliderEL: p5.Element;
    let subject: Subject;
    let thoughts: Thought[] = [];

    const showPlaceholders = false;

    // states
    let phase!: Phases;
    let ready = false;
    let transformingT: number | undefined = undefined;
    let selectedT: number | undefined = undefined;

    // temporary values
    let negativeAmount = 0;

    //// setup
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent('thoughts');

      const subjDiv = p.createDiv().addClass('subject').addClass(getPhaseKeyText(this.phase)!);
      const subjInput = p.createInput().attribute('spellcheck', 'false').parent(subjDiv).attribute('maxlength', '16');;
      subject = new Subject(p, subjDiv, subjInput);
      subject.input.elt.addEventListener('change', () => {
        if(subject.input.value() !== '') {
          this.toggleReadyBtn(true);
          subject.input.elt.blur();
        }
      });

      inputEL = p.createInput().addClass('thought-input').addClass('invisible').attribute('placeholder', 'iets wat stress geeft...').attribute('maxlength', '36');
      inputEL.elt.addEventListener('change', () => {
        this.addThought(p, inputEL, thoughts, negativeAmount);
        transformingT = thoughts.length - 1;
      });

      if(showPlaceholders) {
        thoughts = [
          new Thought(p, this.phase, 0, 'Nega1', 50, 1000, 200),
          new Thought(p, this.phase, 1, 'Nega2', 10, 100, 300),
          new Thought(p, this.phase, 2, 'Pos1', 30, 600, 100),
          new Thought(p, this.phase, 3, 'Pos2', 150, 200, 600)
        ];
        thoughts.forEach((t, i) => {
          t.positionMode=false;
          t.selected=false;
          i > 1 ? t.type = 'positive' : t.type = 'negative';
        })
      }
    };

    //// Draw
    p.draw = () => {
      p.background(255, 255, 255);
      /// reset default cursor
      if (transformingT === undefined) { p.cursor('default') }

      // show axis on rationality phase
      if (this.phase === Phases.RATIONALITY) {
        p.stroke(217, 217, 217);
        p.strokeWeight(2);
        p.line(20, p.windowHeight/2+2, p.windowWidth-20, p.windowHeight/2+2);
      }

      // display thoughts
      thoughts.forEach(t => {
        // hide positives if negatives are ordered on rationality
        if (!(this.phase === Phases.RATIONALITY && t.type === 'positive')) {
          t.show(!(transformingT === undefined) && transformingT !== t.index && selectedT !== t.index)
        }
      });

      // if phase updated
      if (this.updatePhase(phase)) {
        phase = this.phase
        ready = false;
        // subject only updated on player ready
        if (this.phase !== Phases.SUBJECT) { subject.setClasses(phase); }
        if (this.phase === Phases.POSITIVE) {
          negativeAmount = thoughts.length;
          inputEL.attribute('placeholder', 'positieve kanten...');
        }
        else if (this.phase === Phases.RATIONALITY) {
          thoughts.forEach(t => {
            if (t.type === 'negative') {
              t.storedX = t.x;
              t.storedY = t.y;
            }
          });
          inputEL.addClass('invisible');
        } else if (this.phase === Phases.INPERSPECTIVE) {
          thoughts.forEach(t => {
            if (t.type === 'negative') {
              t.isRealistic = t.checkIfRealistic();
              t.x = t.storedX;
              t.y = t.storedY;
            }

            t.storedSize = t.size;
          });
          // define thoughts irrational/realistic
          sliderEL = p.createSlider(-100, 100, 0).class('realism-slider');
          sliderEL.elt.addEventListener('change', (v: any) => {
            const val: number = v.target.value;

            thoughts.forEach(t => {
              if (t.type === 'negative' && !t.isRealistic) {
                t.storedSize - val/4 > 0 ? t.size = t.storedSize - val/4 : t.size = 1;
                // val > 0 ? t.transparency -= val : t.transparency = 255;
              } else if (t.type === 'positive') {
                t.size = t.storedSize + val/4;
              }
            })
          })
        }
      }

      // if player is ready
      if (this.updateReady(ready)) {
        ready = this.ready;

        if(ready) {
          if (this.phase === Phases.SUBJECT) {
            subject.setClasses(phase);
          } else if (this.phase === Phases.NEGATIVE) {
            inputEL.hasClass('invisible') ? inputEL.removeClass('invisible') : null;
            inputEL.elt.focus();
          } else if (this.phase === Phases.RATIONALITY) {
            setTimeout(() => this.toggleReadyBtn(true), 5000);
          }
        }
      }
    }

    //// input events
    p.mousePressed = () => {
      const t = this.thoughtHovered(thoughts, p.mouseX, p.mouseY);
      // on click on thought
      if (t) {
        // give selected instance higher 'z-index' (otherwise feels confusing)
        thoughts.splice(t.inst.index, 1);
        thoughts.unshift(t.inst);
        // reset all index values of thoughts
        thoughts.forEach((t, i) => t.index = i);

        selectedT = t.inst.index;
        // set selected on true of instance and false the rest
        thoughts.forEach(t => t.selected = !!(t.index === selectedT));

        // depending on zone, activate drag or resize mode
        if (transformingT === undefined) {
          transformingT = t.inst.index;
          t.inst.startMx = p.mouseX;
          t.inst.startMy = p.mouseY;

          if (t.zone === 'inner') {
            t.inst.startPosX = t.inst.x;
            t.inst.startPosY = t.inst.y;
            t.inst.dragMode = true;
          } else if (t.zone !== undefined) {
            t.inst.resizeStartSize = t.inst.size;
            t.inst.resizeMode = true;
          }
        }

        // }
      } else if (selectedT !== undefined) {
        // click outside selected (deselect)
        thoughts[selectedT as number].selected = false;
        selectedT = undefined;
      }
    }

    p.mouseDragged = () => {
      if (transformingT !== undefined) {
        const t = thoughts[transformingT];
        if (t.dragMode) { t.drag(p.mouseX, p.mouseY) }
        else if(t.resizeMode) { t.resize(p.mouseX, p.mouseY) }
        else if(t.positionMode) { t.position(p.mouseX, p.mouseY) }
      }
    }

    p.mouseReleased = () => {
      // release state if stopped with dragging
      const dragged = thoughts.find(t => t.dragMode);
      const resized = thoughts.find(t => t.resizeMode);
      const positioned = thoughts.find(t => t.positionMode);
      if (dragged !== undefined) {
        dragged.dragMode = false;
        transformingT = undefined;
      } else if (resized !== undefined) {
        resized.resizeMode = false;
        transformingT = undefined;
      }  else if (positioned !== undefined) {
        positioned.positionMode = false;
        transformingT = undefined;
      }
    }

    p.keyPressed = () => {
      // delete thought on backspace / delete button
      if (selectedT !== undefined && (p.keyCode === p.DELETE || p.keyCode === p.BACKSPACE)) {
        thoughts.splice(selectedT, 1);
        thoughts.forEach((t, i) => t.index = i);
      }
    }

    p.windowResized = () => { p.resizeCanvas(p.windowWidth, p.windowHeight); }
  };

  thoughtHovered(thoughts: Thought[], mx: number, my: number): { inst: Thought, zone: ('inner' | ResizeHandlers) } | undefined {
    const inst = thoughts.find(t => t.isHovered(mx, my) !== undefined);
    if (inst !== undefined && !inst.resizeMode && !inst.dragMode) {
      const zone = inst.isHovered(mx, my);

      return zone !== undefined ? {inst, zone} : undefined;
    } else { return undefined }
  }

  updatePhase(phase: Phases): boolean { return (phase !== this.phase) }
  updateReady(ready: boolean): boolean { return (ready !== this.ready) }

  addThought(p:p5, input: p5.Element, thoughts: Thought[], negativeAmount: number) {
    const t = new Thought(p, this.phase, thoughts.length, input.value() as string, 18, p.windowWidth/2, p.windowHeight-80);
    // show 'next' button if minimum amount is reached
    if(this.phase === Phases.NEGATIVE) { thoughts.length >= 1 ? this.toggleReadyBtn(true) : this.toggleReadyBtn(false); }
    else if(this.phase === Phases.POSITIVE) {
      // set thought type to positive
      t.type = 'positive';
      // show 'next' button if minimum amount is reached
      thoughts.length - negativeAmount >= 1 ? this.toggleReadyBtn(true) : this.toggleReadyBtn(false);
    }

    thoughts.push(t);
    input.value('');
    input.elt.blur();
  }

  toggleReadyBtn(show: boolean) {
    this.showReadyBtn.emit(show);
  }
}
