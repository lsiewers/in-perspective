import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(private routerService: RouterService) { }

  ngOnInit(): void {
  }

  nextPhase() {
    this.routerService.route(false);
  }
}
