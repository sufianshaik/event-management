import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackEventNameComponent } from './feedback-event-name.component';

describe('FeedbackEventNameComponent', () => {
  let component: FeedbackEventNameComponent;
  let fixture: ComponentFixture<FeedbackEventNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackEventNameComponent]
    });
    fixture = TestBed.createComponent(FeedbackEventNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
