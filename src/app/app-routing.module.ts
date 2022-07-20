import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { Phases } from './enums/phases';
import { IntroPhaseComponent } from './phases/intro-phase/intro-phase.component';
import { NegativePhaseComponent } from './phases/negative-phase/negative-phase.component';
import { PositivePhaseComponent } from './phases/positive-phase/positive-phase.component';
import { SortPhaseComponent } from './phases/sort-phase/sort-phase.component';
import { SubjectPhaseComponent } from './phases/subject-phase/subject-phase.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: Phases.INTRO.toString(),
        component: IntroPhaseComponent
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
        path: Phases.SORT.toString(),
        component: SortPhaseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
