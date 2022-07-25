import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPerspectivePhaseComponent } from './in-perspective-phase.component';

describe('InPerspectivePhaseComponent', () => {
  let component: InPerspectivePhaseComponent;
  let fixture: ComponentFixture<InPerspectivePhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InPerspectivePhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InPerspectivePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
