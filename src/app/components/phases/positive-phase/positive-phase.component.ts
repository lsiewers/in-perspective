import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-positive-phase',
  templateUrl: './positive-phase.component.html',
  styleUrls: ['./positive-phase.component.scss']
})
export class PositivePhaseComponent implements OnInit {
  info = [
    {
      icon: 'text',
      description: '<strong>Beschrijf</strong> zoveel mogelijk van je <i>krachten, mogelijkheden & voordelen</i> bij [onderwerp]',
      note: 'Waar ben je goed in? Wat kan je hier juist wel? Wat zijn de voordelen?'
    },
    {
      icon: 'position',
      description: '<strong>Positioneer</strong> wat bij elkaar hoort bij elkaar',
    },
    {
      icon: 'resize',
      description: '<strong>Schaal</strong> deze ook op basis van <italic>impact</italic>',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
