import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTopComponent } from './summary-top.component';

describe('SummaryTopComponent', () => {
  let component: SummaryTopComponent;
  let fixture: ComponentFixture<SummaryTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
