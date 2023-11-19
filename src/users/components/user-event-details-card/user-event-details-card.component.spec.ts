import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEventDetailsCardComponent } from './user-event-details-card.component';

describe('UserEventDetailsCardComponent', () => {
  let component: UserEventDetailsCardComponent;
  let fixture: ComponentFixture<UserEventDetailsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEventDetailsCardComponent]
    });
    fixture = TestBed.createComponent(UserEventDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
