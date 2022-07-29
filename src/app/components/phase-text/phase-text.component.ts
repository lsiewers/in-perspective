import { ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Info } from '../../models/info';
import { DataService } from '../../services/data.service';
import { Phases } from 'src/app/models/phases';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phase-text',
  templateUrl: './phase-text.component.html',
  styleUrls: ['./phase-text.component.scss']
})
export class PhaseTextComponent implements OnInit, OnChanges {
  info!: Promise<Info>;
  show = true;
  currentPhase!: Phases;

  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private route: ActivatedRoute,
  ) {

    this.modalService.modalEmitted$.subscribe(change => this.show = change)
  }

  ngOnInit() {
    this.route.url.subscribe(r => {
      this.currentPhase = Number(r[0].path) as Phases;
      this.open();
      this.ngOnChanges();
    });
  }

  ngOnChanges(): void {
    this.info = this.dataService.getInfo(this.currentPhase).then(info => {
      console.log(this.show, info, this.currentPhase);
      return info as Info
    });

  }

  close() {
    this.show = false;
    this.modalService.open(false);
  }

  open() {
    this.show = true;
    this.modalService.open(true);
  }

}
