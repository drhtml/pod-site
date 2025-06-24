import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryRightComponent } from './summary-right.component';

describe('SummaryRightComponent', () => {
  let component: SummaryRightComponent;
  let fixture: ComponentFixture<SummaryRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
