import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPhaseComponent } from './subject-phase.component';

describe('SubjectPhaseComponent', () => {
  let component: SubjectPhaseComponent;
  let fixture: ComponentFixture<SubjectPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
