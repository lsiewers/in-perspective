import { Component, OnInit } from '@angular/core';
import { getPhaseValueByKey } from 'src/app/functions/convertEnums';
import { Phases } from 'src/app/models/phases';

@Component({
  selector: 'app-negative-phase',
  templateUrl: './negative-phase.component.html',
  styleUrls: ['./negative-phase.component.scss']
})
export class NegativePhaseComponent implements OnInit {
  phase: Phases = getPhaseValueByKey('NEGATIVE');

  ngOnInit(): void {
  }

}
