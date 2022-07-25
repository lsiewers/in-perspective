import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-phase-text',
  templateUrl: './phase-text.component.html',
  styleUrls: ['./phase-text.component.scss']
})
export class PhaseTextComponent implements OnInit {
  @Input('subject') subject: string = '';
  @Input('tasks') tasks: {icon: string; description: string; note?: string}[] = [];
  @Input('open') show = true;

  @Input('xPos') xPos: 'LEFT' | 'CENTER' | 'RIGHT' = 'CENTER';
  @Input('yPos') yPos: 'TOP' | 'CENTER' | 'BOTTOM' = 'TOP';

  constructor(private modalService: ModalService) {   }

  ngOnInit(): void {
  }

  close() {
    this.show = false;
    this.modalService.open(false);
  }

  open() {
    this.show = true;
    this.modalService.open(true);
  }

}
