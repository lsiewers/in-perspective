import { Component, OnInit } from '@angular/core';
import { getPhaseValueByKey } from 'src/app/functions/convertEnums';
import { Info } from 'src/app/models/info';
import { Phases } from 'src/app/models/phases';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-rationality-phase',
  templateUrl: './rationality-phase.component.html',
  styleUrls: ['./rationality-phase.component.scss']
})
export class RationalityPhaseComponent implements OnInit {
  phase: Phases = getPhaseValueByKey('RATIONALITY');

  ngOnInit(): void {
  }

}
