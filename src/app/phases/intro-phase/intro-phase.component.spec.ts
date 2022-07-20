import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroPhaseComponent } from './intro-phase.component';

describe('IntroPhaseComponent', () => {
  let component: IntroPhaseComponent;
  let fixture: ComponentFixture<IntroPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroPhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
