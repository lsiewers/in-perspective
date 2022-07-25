import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-negative-phase',
  templateUrl: './negative-phase.component.html',
  styleUrls: ['./negative-phase.component.scss']
})
export class NegativePhaseComponent implements OnInit {
  info = [
    {
      icon: 'text',
      description: '<strong>Beschrijf</strong> zoveel mogelijk invloeden die je stress geven bij je onderwerp',
      note: 'Bepaalde gedachtes, gebeurtenissen, zorgen etc.'
    },
    {
      icon: 'position',
      description: '<strong>Positioneer</strong> bij elkaar wat bij elkaar hoort',
      note: 'Dit kan helpen meer invloeden te verzinnen.'
    },
    {
      icon: 'resize',
      description: '<strong>Schaal</strong> de invloeden op basis van <i>impact</i>',
      note: ''
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
