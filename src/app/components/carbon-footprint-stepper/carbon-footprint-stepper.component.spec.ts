import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonFootprintStepperComponent } from './carbon-footprint-stepper.component';

describe('CarbonFootprintStepperComponent', () => {
  let component: CarbonFootprintStepperComponent;
  let fixture: ComponentFixture<CarbonFootprintStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarbonFootprintStepperComponent]
    });
    fixture = TestBed.createComponent(CarbonFootprintStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
