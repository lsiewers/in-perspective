import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositivePhaseComponent } from './positive-phase.component';

describe('PositivePhaseComponent', () => {
  let component: PositivePhaseComponent;
  let fixture: ComponentFixture<PositivePhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositivePhaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositivePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
