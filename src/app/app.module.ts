import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhaseTextComponent } from './components/phase-text/phase-text.component';
import { ThoughtsComponent } from './components/thoughts/thoughts.component';
import { IntroComponent } from './components/intro/intro.component';
import { NegativePhaseComponent } from './components/phases/negative-phase/negative-phase.component';
import { PositivePhaseComponent } from './components/phases/positive-phase/positive-phase.component';
import { InPerspectivePhaseComponent } from './components/phases/in-perspective-phase/in-perspective-phase.component';
import { RationalityPhaseComponent } from './components/phases/rationality-phase/rationality-phase.component';
import { SubjectPhaseComponent } from './components/phases/subject-phase/subject-phase.component';

import { RouterService } from './../app/services/router.service';
import { ModalService } from './../app/services/modal.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PhaseTextComponent,
    ThoughtsComponent,
    IntroComponent,
    NegativePhaseComponent,
    PositivePhaseComponent,
    InPerspectivePhaseComponent,
    RationalityPhaseComponent,
    SubjectPhaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RouterService,
    ModalService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
