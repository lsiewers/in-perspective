import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhaseTextComponent } from './components/phase-text/phase-text.component';
import { ThoughtsComponent } from './components/thoughts/thoughts.component';
import { IntroComponent } from './components/intro/intro.component';
import { SubjectPhaseComponent } from './phases/subject-phase/subject-phase.component';
import { NegativePhaseComponent } from './phases/negative-phase/negative-phase.component';
import { SortPhaseComponent } from './phases/sort-phase/sort-phase.component';

@NgModule({
  declarations: [
    AppComponent,
    PhaseTextComponent,
    ThoughtsComponent,
    IntroComponent,
    SubjectPhaseComponent,
    NegativePhaseComponent,
    SortPhaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
