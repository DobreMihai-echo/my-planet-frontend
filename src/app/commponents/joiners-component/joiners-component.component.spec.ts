import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinersComponentComponent } from './joiners-component.component';

describe('JoinersComponentComponent', () => {
  let component: JoinersComponentComponent;
  let fixture: ComponentFixture<JoinersComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinersComponentComponent]
    });
    fixture = TestBed.createComponent(JoinersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
