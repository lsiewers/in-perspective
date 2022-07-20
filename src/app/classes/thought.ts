
import * as p5 from 'p5';
import { Phases } from '../enums/phases';

export class Thought {
  p: p5;
  phase: Phases;

  index: number;
  x: number;
  y: number;
  w: number;
  h: number;

  text: string;
  size: number;
  pad = 8;
  rsPad = 8; // resize buttons clickable padding

  dragMode = false;
  resizeMode = false;
  positionMode = true;
  selected = false;

  resizeStartSize!: number;
  startMx!: number;
  startMy!: number;
  startPosX!: number;
  startPosY!: number;

  constructor(p5: p5, phase: Phases, i: number, text: string, size: number, x: number, y: number) {
    this.p = p5;
    this.phase = phase;
    this.index = i;

    this.text = text;
    this.size = size;

    this.x = x;
    this.y = y;

    this.p.textSize(this.size);
    this.w = this.p.textWidth(this.text)
    this.h = this.size;

  }

  show(inActive: boolean) {
    this.p.textSize(this.size);
    this.w = this.p.textWidth(this.text)
    this.h = this.size;
    const isHovered = this.isHovered(this.p.mouseX, this.p.mouseY) ;
    if (!inActive) {
      if (isHovered !== undefined && !this.dragMode && !this.resizeMode) {
        this.hoverEffect(this.isHovered(this.p.mouseX, this.p.mouseY)!);
      } else if (this.dragMode) { this.drag(this.p.mouseX, this.p.mouseY);
      } else if (this.resizeMode) { this.resize(this.p.mouseX, this.p.mouseY);
      } else if (this.positionMode) { this.position(this.p.mouseX, this.p.mouseY); }

      if (this.selected || isHovered) {
        this.selected ? this.p.stroke(180, 180, 180) : this.p.stroke(217, 217, 217);
        this.p.strokeWeight(1);
        this.p.noFill()
        this.p.rect(this.x - this.w/2 - this.pad/2 - this.rsPad/2, this.y - this.h - this.pad, this.w + this.pad + this.rsPad, this.h + this.pad*2 + this.rsPad/2);
      }
    }


    this.p.textAlign(this.p.CENTER);
    this.p.fill(0,0,0);
    this.p.noStroke();
    this.p.text(this.text, this.x, this.y);
  };

  isHovered(mx: number, my: number): 'inner' | 'outer' | undefined {
    /// mouse collision w/ text object
    if (
      mx > this.x - this.w/2 - this.pad - this.rsPad &&
      mx < this.x + this.w/2 + this.pad + this.rsPad &&
      my < this.y + this.pad*2 + this.rsPad &&
      my > this.y - this.h - this.pad/2 - this.rsPad
    ) {
      if (
        mx > this.x - this.w/2 - this.pad &&
        mx < this.x + this.w/2 + this.pad &&
        my < this.y + this.pad*2 &&
        my > this.y - this.h - this.pad/2
      ) {
        return 'inner';
      } else {
        return 'outer';
      }
    } else {
      return undefined;
    }
  }

  hoverEffect(hoverZone: 'inner' | 'outer') {
    // stroke effect
    if (hoverZone === 'outer') {
      this.p.cursor('nesw-resize');
      console.log('show cursor', 'news-resize');
      // resize buttons
      for(let i = 0; i < 4; i++) {
        let x;
        let y;

        if (i === 0) {
          // tl
          x = this.x - this.w/2 - this.pad - this.rsPad/2;
          y = this.y - this.h - this.pad - this.rsPad/2;
        } else if (i === 1) {
          // tr
          x = this.x + this.w/2 + this.pad + this.rsPad/2;
          y = this.y - this.h - this.pad - this.rsPad/2;
        } else if (i === 2) {
          // br
          x = this.x + this.w/2 + this.pad + this.rsPad/2;
          y = this.y + this.pad*1.5 + this.rsPad/2;
        } else {
          // br
          x = this.x - this.w/2 - this.pad - this.rsPad/2;
          y = this.y + this.pad*1.5 + this.rsPad/2;
        }

        this.p.noFill();
        this.p.stroke(0, 0, 0);
        this.p.strokeWeight(1 + this.rsPad/15);
        this.p.circle(x, y, 3 + this.rsPad/7.5);
      }
    }
    else {
      // background effect
      // this.p.noStroke();
      // this.p.fill(247, 247, 247);
      // this.p.rect(this.x - this.w/2 - this.pad, this.y - this.h  - this.pad, this.w + this.pad*2, this.h + this.pad*2.5);
      this.p.cursor('move');
    }
  }

  // on p5 event
  position (mx: number, my: number) {
    this.x = mx;
    this.y = my;
  }

  drag(mx: number, my: number) {
    this.x = this.startPosX - this.startMx + mx;
    this.y = this.startPosY - this.startMy + my;
  };

  resize(mx: number, my: number) {
    const cd = this.p.dist(this.x, this.y - this.h/2, mx, my);
    const scd = this.p.dist(this.startMx, this.startMy, this.x, this.y - this.h/2);

    this.size = this.resizeStartSize - scd + cd;
    this.rsPad = this.size / 2.5;

    this.p.stroke(217, 217, 217);
    this.p.strokeWeight(1);
    this.p.line(this.x, this.y - this.h/4, mx, my);
  };
}
