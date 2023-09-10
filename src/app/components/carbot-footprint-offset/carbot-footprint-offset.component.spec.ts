import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbotFootprintOffsetComponent } from './carbot-footprint-offset.component';

describe('CarbotFootprintOffsetComponent', () => {
  let component: CarbotFootprintOffsetComponent;
  let fixture: ComponentFixture<CarbotFootprintOffsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarbotFootprintOffsetComponent]
    });
    fixture = TestBed.createComponent(CarbotFootprintOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
