import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getPhaseKeyText } from './functions/convertEnums';
import { Phases } from './enums/phases';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @Input('note') note = '';
  title = 'ective';
  currentPhase: Phases = Phases.SUBJECT;
  showReadyBtn = false;

  constructor(private router: Router) {
    this.router.navigate([this.currentPhase.toString()]);
  }

  nextPhase() {
    this.currentPhase++;
    this.router.navigate([this.currentPhase.toString()]);
    this.showReadyBtn = false;
  }

  getPhase(): string {
    return getPhaseKeyText(this.currentPhase)!;
  }

  isThoughtPhase(): boolean {
    return !!(this.currentPhase === Phases.NEGATIVE || this.currentPhase === Phases.SORT);
  }

  toggleReadyBtn(show: any) {
    this.showReadyBtn = show;
  }
}
