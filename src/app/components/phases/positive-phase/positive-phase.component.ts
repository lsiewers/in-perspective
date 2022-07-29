import { Component, OnInit } from '@angular/core';
import { getPhaseValueByKey } from 'src/app/functions/convertEnums';
import { Info } from 'src/app/models/info';
import { Phases } from 'src/app/models/phases';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-positive-phase',
  templateUrl: './positive-phase.component.html',
  styleUrls: ['./positive-phase.component.scss']
})
export class PositivePhaseComponent implements OnInit {
  phase: Phases = getPhaseValueByKey('NEGATIVE');

  ngOnInit(): void {
  }

}
