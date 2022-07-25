import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rationality-phase',
  templateUrl: './rationality-phase.component.html',
  styleUrls: ['./rationality-phase.component.scss']
})
export class RationalityPhaseComponent implements OnInit {
  info = [
    {
      icon: 'position',
      description: '<strong>Positioneer</strong> negatieve invloeden op irrationeel of realistisch.',
      note: 'Irrationeel betekent doorgaans een (te) negatieve gedachte, ook wel bekend als een <a href="https://static1.squarespace.com/static/5cb61b1e29f2cc34d16e2bd6/t/6022ebb01ea23571f0e84bbe/1612901311272/cognitive-distortions-examples-infographic.pdf" target="_blank">cognitive distortion</a>. <br> Na deze stap wordt alles weer op de huidige positie teruggeplaatst'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
