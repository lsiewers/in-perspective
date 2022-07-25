import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-perspective-phase',
  templateUrl: './in-perspective-phase.component.html',
  styleUrls: ['./in-perspective-phase.component.scss']
})
export class InPerspectivePhaseComponent implements OnInit {
  info = [
    {
      icon: 'position',
      description: '<strong>Bekijk</strong> wat er gebeurt wanneer je irrationeel of realistisch bent',
      note: 'Dit is een impressie wat negatieve gedachtes en stress met ons kunnen doen. <br> Als we daar goed mee kunnen omgaan, zien we alles realistischer.'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
