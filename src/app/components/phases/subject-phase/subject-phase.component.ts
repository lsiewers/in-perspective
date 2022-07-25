import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject-phase',
  templateUrl: './subject-phase.component.html',
  styleUrls: ['./subject-phase.component.scss']
})
export class SubjectPhaseComponent implements OnInit {
  info = [
    {
      icon: 'text',
      description: '<strong>Beschrijf</strong> in 1 a 2 woorden waar je recentelijk stress van ervaart',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
