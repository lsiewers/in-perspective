
import * as p5 from 'p5';
import { Phases } from '../models/phases';
import { ResizeHandlers } from '../models/resize-handlers';

export class Thought {
  p: p5;
  phase: Phases;

  x: number;
  y: number;
  w: number;
  h: number;

  index: number;
  type: 'positive' | 'negative' = 'negative';

  // ui values
  text: string;
  size: number;
  transparency = 255;
  pad = 8;
  rsPad = 12; // resize handlers padding

  // modes
  dragMode = false;
  resizeMode = false;
  positionMode = true;
  selected = true;

  // rest values
  resizeStartSize!: number;
  startMx!: number;
  startMy!: number;
  startPosX!: number;
  startPosY!: number;

  storedX!: number;
  storedY!: number;
  storedSize!: number;
  isRealistic = true;

  constructor(p5: p5, phase: Phases, i: number, text: string, size: number, x: number, y: number) {
    this.p = p5;
    this.phase = phase;
    this.index = i;

    this.text = text;
    this.size = size;

    this.x = x;
    this.y = y;

    this.p.textFont('mundial');
    this.p.textSize(this.size);
    this.w = this.p.textWidth(this.text)
    this.h = this.size;
  }

  show(inActive: boolean) {
    this.p.textSize(this.size);
    this.w = this.p.textWidth(this.text)
    this.h = this.size;

    const isHovered = this.isHovered(this.p.mouseX, this.p.mouseY);

    if (!inActive) {
      if (this.selected) {
        if (isHovered !== undefined && !this.dragMode && !this.resizeMode && !this.positionMode) {
          this.onHover(isHovered);
        } else if (this.dragMode) { this.drag(this.p.mouseX, this.p.mouseY);
        } else if (this.resizeMode) { this.resize(this.p.mouseX, this.p.mouseY);
        } else if (this.positionMode) { this.position(this.p.mouseX, this.p.mouseY); }
        this.p.stroke(170, 170, 170);
      } else if (isHovered) {
        this.p.stroke(237, 237, 237);
        this.p.cursor('pointer')
      }

      if (this.selected || isHovered) {
        // select box
        this.p.strokeWeight(1);
        this.p.noFill()
        this.p.rect(this.x - this.w/2 - this.pad, this.y - this.h - this.pad, this.w + this.pad*2, this.h*1.25 + this.pad*2);
      }
    }

    this.p.textAlign(this.p.CENTER);
    this.p.fill(0,0,0, this.transparency);
    this.p.noStroke();
    this.p.text(this.text, this.x, this.y);
  };

  isHovered(mx: number, my: number): 'inner' | ResizeHandlers | undefined {
    /// mouse collision w/ outer size text object
    if (
      mx > this.x - this.w/2 - this.pad - this.rsPad &&
      mx < this.x + this.w/2 + this.pad + this.rsPad &&
      my < this.y + this.pad + this.rsPad + this.h*.25 &&
      my > this.y - this.h*1.25 - this.pad - this.rsPad
    ) {
      /// mouse collision w/ inner size of object
      if (
        mx > this.x - this.w/2 - this.pad &&
        mx < this.x + this.w/2 + this.pad &&
        my < this.y + this.pad + this.h*.25 &&
        my > this.y - this.h*1.25 - this.pad
      ) {
        return 'inner';
      } else if (this.selected) {
        // check if and which resize handler is hovered
        const treshold = 20;
        let handlerHover: ResizeHandlers | undefined;
        for(let h: ResizeHandlers = 0; h < Object.values(ResizeHandlers).length / 2; h++) {
          const d = this.p.dist(mx, my, this.getResizeHandler(h).x, this.getResizeHandler(h).y);
          if (d < treshold) { handlerHover = h; }
        }

        return handlerHover;
      } else { return undefined; }
    } else {
      return undefined;
    }
  }

  onHover(zone: 'inner' | ResizeHandlers | undefined) {
    // Show resize handlers
    if (zone !== undefined && zone !== 'inner') {
      // highlight dots if hovering on resize-handler
      this.p.stroke(0, 0, 0);
      // set cursor resize per dots
      zone === ResizeHandlers.TL || zone === ResizeHandlers.BR ? this.p.cursor('nwse-resize') : this.p.cursor('nesw-resize');
    } else {
      // show light stroke while (re-)positioning
      this.p.cursor('move');
      this.p.stroke(180, 180, 180)
    }

    // display resize handlers
    for(let h: ResizeHandlers = ResizeHandlers.TL; h < Object.keys(ResizeHandlers).length / 2; h++) {
      this.p.noFill();
      this.p.strokeWeight(1 + this.rsPad/15);
      this.p.circle(this.getResizeHandler(h).x, this.getResizeHandler(h).y, 3 + this.rsPad/7.5);
    }
  }

  getResizeHandler(handler: ResizeHandlers): {x: number, y: number} {
    let x: number;
    let y: number;

    // resize buttons
    if (handler === ResizeHandlers.TL) {
      // tl
      x = this.x - this.w/2 - this.pad - this.rsPad/2;
      y = this.y - this.h - this.pad - this.rsPad/2;
    } else if (handler === ResizeHandlers.TR) {
      // tr
      x = this.x + this.w/2 + this.pad + this.rsPad/2;
      y = this.y - this.h - this.pad - this.rsPad/2;
    } else if (handler === ResizeHandlers.BR) {
      // br
      x = this.x + this.w/2 + this.pad + this.rsPad/2;
      y = this.y + this.h*.25 + this.pad + this.rsPad/2;
    } else {
      // bl
      x = this.x - this.w/2 - this.pad - this.rsPad/2;
      y = this.y + this.h*.25 + this.pad + this.rsPad/2;
    }

    return {x, y};
  }

  checkIfRealistic() { return this.x > this.p.windowWidth/2; }

  changeSize(val: number) {
    if (this.type === 'negative' && !this.isRealistic) {
      this.size = this.storedSize - val/6 > 1 ? this.storedSize - val/6 : 1;
      this.transparency = val > 0 ? 255 - val*2 : 255;
    } else if (this.type === 'positive') {
      this.size = this.storedSize + val/6 > 1 ? this.storedSize + val/6 : 1 ;
      this.transparency = val < 0 ? 255 + val*2 : 255;
    }
  }

  // on p5 event
  position (mx: number, my: number) {
    this.p.cursor('grabbing');
    this.x = mx;
    this.y = my;
  }

  drag(mx: number, my: number) {
    this.p.cursor('grabbing');
    this.x = this.startPosX - this.startMx + mx;
    this.y = this.startPosY - this.startMy + my;
  };

  resize(mx: number, my: number) {
    const cd = this.p.dist(this.x, this.y - this.h/2, mx, my);
    const scd = this.p.dist(this.startMx, this.startMy, this.x, this.y - this.h/2);
    const newSize = this.resizeStartSize - scd + cd;
    const minSize = 8;
    const maxSize = 100;

    this.size = newSize >= minSize && newSize <= maxSize ? newSize : this.size;
    this.rsPad = this.size / 2.5;

    this.p.stroke(217, 217, 217);
    this.p.strokeWeight(1);
    this.p.line(this.x, this.y - this.h/4, mx, my);
  };
}
