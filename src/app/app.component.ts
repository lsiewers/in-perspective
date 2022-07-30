import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getPhaseKeyText } from './functions/convertEnums';
import { RouterService } from './services/router.service';
import { ModalService } from './services/modal.service';
import { Phases } from './models/phases';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ective';
  currentPhase: Phases = Phases.INTRO;
  showReadyBtn = false;
  enteredPositive = false;

  constructor(
    private router: Router,
    private routerService: RouterService,
    private modalService: ModalService
  ) {
    this.routerService.routeEmitted$.subscribe(route => { route ? this.toPhase(route) : this.nextPhase() });
    this.router.navigate([this.currentPhase.toString()]);
  }

  toPhase(phase: string) {
    this.currentPhase = Number(phase) as Phases;
    this.onPhaseChange();
  }

  nextPhase() {
    this.currentPhase++;
    this.onPhaseChange();
  }

  onPhaseChange() {
    this.currentPhase === Phases.POSITIVE && !this.enteredPositive ? this.enteredPositive = true : null;
    !!(this.enteredPositive && this.isThoughtPhase()) ? this.toggleReadyBtn(true) : this.toggleReadyBtn(false);

    this.router.navigate([this.currentPhase]);
    this.modalService.open(true);
  }

  getPhaseNumber(phase: string) { return Object.values(Phases).indexOf(phase) }
  getPhase(): string { return getPhaseKeyText(this.currentPhase)!; }
  isThoughtPhase(): boolean { return !!(this.currentPhase === Phases.NEGATIVE || this.currentPhase === Phases.POSITIVE); }
  toggleReadyBtn(show: any) { this.showReadyBtn = show; }
}
