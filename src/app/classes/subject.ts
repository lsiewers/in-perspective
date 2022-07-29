import * as p5 from 'p5';

import { getPhaseKeyText } from '../functions/convertEnums';
import { Phases } from '../models/phases';

export class Subject {
  p: p5;
  div: p5.Element;
  input: p5.Element;

  constructor(p5: p5, div: p5.Element, input: p5.Element) {
    this.p = p5;
    this.div = div;
    this.input = input;
  }

  setClasses(phase: Phases) {
    if (phase === Phases.SUBJECT) {
      this.input.hasClass('editable') ? null : this.input.addClass('editable')
      this.input.elt.focus();
    }
    else { this.input.hasClass('editable') ? this.input.removeClass('editable') : null }

    const phaseT = getPhaseKeyText(phase)!;
    this.div.elt.classList = ['subject'];

    if (!this.div.hasClass(phaseT)) { this.div.addClass(phaseT); }
  }
}
