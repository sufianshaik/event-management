import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCompletedButtonUserComponent } from './event-completed-button-user.component';

describe('EventCompletedButtonUserComponent', () => {
  let component: EventCompletedButtonUserComponent;
  let fixture: ComponentFixture<EventCompletedButtonUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventCompletedButtonUserComponent]
    });
    fixture = TestBed.createComponent(EventCompletedButtonUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
