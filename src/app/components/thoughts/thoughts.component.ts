import * as p5 from 'p5';
import { Component, Input, OnInit, EventEmitter, Output, HostListener } from '@angular/core';

import { Thought } from '../../classes/thought';
import { Phases } from '../../enums/phases';
import { Subject } from '../../classes/subject';
import { getPhaseKeyText } from '../../functions/convertEnums';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-thoughts',
  templateUrl: './thoughts.component.html',
  styleUrls: ['./thoughts.component.scss']
})

export class ThoughtsComponent implements OnInit {
  phase!: Phases;
  @Output('showReadyBtn') showReadyBtn = new EventEmitter<boolean>();

  private p5!: p5;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) { this.phase = (Number(event.url[1]) as Phases); }
    });
  }

  ngOnInit(): void {
    this.p5 = new p5(this.sketch)
  }

  private sketch = (p: p5) => {
    let inputEL: p5.Element;
    let subject: Subject;
    let thoughts: Thought[] = [];
    let phase!: Phases;
    let transformingT: number | undefined = undefined;
    let selectedT: number | undefined = undefined;

    //// Setup
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent('thoughts');

      const subjDiv = p.createDiv().addClass('subject').addClass(getPhaseKeyText(this.phase)!);
      const subjInput = p.createInput().addClass('editable').parent(subjDiv);
      subject = new Subject(p, subjDiv, subjInput);
      subject.input.elt.addEventListener('change', () => {
        if(subject.input.value() !== '') {
          this.toggleReadyBtn(true);
          subject.input.elt.blur();
        }
      });

      inputEL = p.createInput().addClass('thought-input').addClass('invisible').attribute('placeholder', 'iets wat stess geeft...');
      inputEL.elt.addEventListener('change', () => {
        this.addThought(p, inputEL, thoughts);
        transformingT = thoughts.length - 1;
      });
    };

    //// Draw
    p.draw = () => {
      p.background(255, 255, 255);

      /// set cursors
      if (transformingT !== undefined) {
        if (thoughts[transformingT].dragMode || thoughts[transformingT].positionMode) {p.cursor('move')}
        else if (thoughts[transformingT].resizeMode) {p.cursor('nesw-resize')}
      } else { p.cursor('default') }

      thoughts.forEach(t => t.show(!(transformingT === undefined) && transformingT !== t.index));

      if (this.updatePhase(phase)) {
        phase = this.phase;
        subject.setClasses(phase);

        if (this.phase === Phases.NEGATIVE) {
          inputEL.hasClass('invisible') ? inputEL.removeClass('invisible') : null;
          inputEL.elt.focus();
        } else if (this.phase === Phases.SORT) {
          inputEL.hasClass('SORT') ? null : inputEL.addClass('SORT');
        }
      }
    }

    //// Interactive events
    p.mousePressed = () => {
      const t = this.thoughtHovered(thoughts, p.mouseX, p.mouseY);
      if (t) {
        selectedT = t.inst.index;
        thoughts.forEach(t => t.selected = !!(t.index === selectedT))

        if (transformingT === undefined) {
          transformingT = t.inst.index;
          t.inst.startMx = p.mouseX;
          t.inst.startMy = p.mouseY;

          if (t.zone === 'inner') {
            t.inst.startPosX = t.inst.x;
            t.inst.startPosY = t.inst.y;
            t.inst.dragMode = true;
          }
          else if (t.zone === 'outer') {
            t.inst.resizeStartSize = t.inst.size;
            t.inst.resizeMode = true;
          }
        } else if (thoughts[transformingT].positionMode) {
          thoughts[transformingT].positionMode = false;
          transformingT = undefined;
        }
        // }
      } else if (selectedT !== undefined) {
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
      p.cursor('default');
    }

    p.keyPressed = () => {
      if (selectedT !== undefined && (p.keyCode === p.DELETE || p.keyCode === p.BACKSPACE)) {
        thoughts.splice(selectedT, 1);
        thoughts.forEach((t, i) => t.index = i);
      }
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  };

  thoughtHovered(thoughts: Thought[], mx: number, my: number): {'inst': Thought, 'zone': 'inner' | 'outer'} | undefined {
    const inst = thoughts.find(t => t.isHovered(mx, my));
    if (inst !== undefined && !inst.resizeMode && !inst.dragMode) {
      const zone = inst.isHovered(mx, my);
      return zone ? {inst, zone} : undefined;
    } else { return undefined }
  }

  updatePhase(phase: Phases): boolean { return (phase !== this.phase) }

  addThought(p:p5, input: p5.Element, thoughts: Thought[]) {
    const t = new Thought(p, this.phase, thoughts.length, input.value() as string, 18, p.windowWidth/2, p.windowHeight-80);
    thoughts.push(t);
    input.value('');

    // input.elt.blur();
    if (this.phase === Phases.NEGATIVE && thoughts.length >= 3) {
      this.toggleReadyBtn(true);
    } else {
      this.toggleReadyBtn(false);
    }
  }

  toggleReadyBtn(show: boolean) {
    this.showReadyBtn.emit(show);
  }
}
