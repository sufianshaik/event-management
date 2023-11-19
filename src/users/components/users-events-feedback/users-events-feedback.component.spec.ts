import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEventsFeedbackComponent } from './users-events-feedback.component';

describe('UsersEventsFeedbackComponent', () => {
  let component: UsersEventsFeedbackComponent;
  let fixture: ComponentFixture<UsersEventsFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersEventsFeedbackComponent]
    });
    fixture = TestBed.createComponent(UsersEventsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
