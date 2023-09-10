import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickChallengeComponent } from './pick-challenge.component';

describe('PickChallengeComponent', () => {
  let component: PickChallengeComponent;
  let fixture: ComponentFixture<PickChallengeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickChallengeComponent]
    });
    fixture = TestBed.createComponent(PickChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
