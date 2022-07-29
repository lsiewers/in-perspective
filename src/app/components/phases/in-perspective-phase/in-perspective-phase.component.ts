import { Component, OnInit } from '@angular/core';
import { getPhaseValueByKey } from 'src/app/functions/convertEnums';
import { Phases } from 'src/app/models/phases';

@Component({
  selector: 'app-in-perspective-phase',
  templateUrl: './in-perspective-phase.component.html',
  styleUrls: ['./in-perspective-phase.component.scss']
})
export class InPerspectivePhaseComponent implements OnInit {
  phase: Phases = getPhaseValueByKey('NEGATIVE');

  ngOnInit(): void {
  }

}
