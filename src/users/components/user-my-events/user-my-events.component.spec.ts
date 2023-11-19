import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyEventsComponent } from './user-my-events.component';

describe('UserMyEventsComponent', () => {
  let component: UserMyEventsComponent;
  let fixture: ComponentFixture<UserMyEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMyEventsComponent]
    });
    fixture = TestBed.createComponent(UserMyEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
