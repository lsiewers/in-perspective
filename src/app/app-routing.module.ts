import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntroComponent } from './components/intro/intro.component';
import { InPerspectivePhaseComponent } from './components/phases/in-perspective-phase/in-perspective-phase.component';
import { NegativePhaseComponent } from './components/phases/negative-phase/negative-phase.component';
import { PositivePhaseComponent } from './components/phases/positive-phase/positive-phase.component';
import { RationalityPhaseComponent } from './components/phases/rationality-phase/rationality-phase.component';
import { SubjectPhaseComponent } from './components/phases/subject-phase/subject-phase.component';

import { Phases } from './enums/phases';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: Phases.INTRO.toString(),
        component: IntroComponent
      },
      {
        path: Phases.SUBJECT.toString(),
        component: SubjectPhaseComponent
      },
      {
        path: Phases.NEGATIVE.toString(),
        component: NegativePhaseComponent
      },
      {
        path: Phases.POSITIVE.toString(),
        component: PositivePhaseComponent
      },
      {
        path: Phases.RATIONALITY.toString(),
        component: RationalityPhaseComponent
      },
      {
        path: Phases.INPERSPECTIVE.toString(),
        component: InPerspectivePhaseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
