import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getPhaseKeyText } from './functions/convertEnums';
import { Phases } from './enums/phases';
import { RouterService } from './services/router.service';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @Input('note') note = '';
  title = 'ective';
  currentPhase: Phases = Phases.INTRO;
  showReadyBtn = false;

  constructor(
    private router: Router,
    private routerService: RouterService,
    private modalService: ModalService
  ) {
    this.routerService.routeEmitted$.subscribe(route => route ? this.toPhase(route) : this.nextPhase());
    this.router.navigate([this.currentPhase.toString()]);
  }

  toPhase(phase: Phases) {
    this.currentPhase = phase;
    this.router.navigate([phase]);
    this.modalService.open(true);
  }

  nextPhase() {
    this.currentPhase++;
    this.router.navigate([this.currentPhase.toString()]);
    this.modalService.open(true);
    this.showReadyBtn = false;
  }

  getPhase(): string { return getPhaseKeyText(this.currentPhase)!; }
  isThoughtPhase(): boolean { return !!(this.currentPhase === Phases.NEGATIVE); }
  toggleReadyBtn(show: any) { this.showReadyBtn = show; }
}
