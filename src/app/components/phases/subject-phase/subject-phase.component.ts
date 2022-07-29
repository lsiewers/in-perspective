import { Component, OnInit } from '@angular/core';
import { Info } from '../../../models/info';
import { Phases } from '../../../models/phases';
import { DataService } from 'src/app/services/data.service';
import { getPhaseValueByKey } from 'src/app/functions/convertEnums';

@Component({
  selector: 'app-subject-phase',
  templateUrl: './subject-phase.component.html',
  styleUrls: ['./subject-phase.component.scss']
})
export class SubjectPhaseComponent implements OnInit {
  phase: Phases = getPhaseValueByKey('SUBJECT');

  ngOnInit(): void {
  }

}
