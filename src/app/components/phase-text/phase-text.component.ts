import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-phase-text',
  templateUrl: './phase-text.component.html',
  styleUrls: ['./phase-text.component.scss']
})
export class PhaseTextComponent implements OnInit {
  @Input('subject') subject: string = '';
  @Input('description') description: string = '';
  @Input('note') note: string = '';

  @Input('xPos') xPos: 'LEFT' | 'CENTER' | 'RIGHT' = 'CENTER';
  @Input('yPos') yPos: 'TOP' | 'CENTER' | 'BOTTOM' = 'TOP';

  constructor() { }

  ngOnInit(): void {
  }

}
