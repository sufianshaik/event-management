import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsCardOrgComponent } from './event-details-card-org.component';

describe('EventDetailsCardOrgComponent', () => {
  let component: EventDetailsCardOrgComponent;
  let fixture: ComponentFixture<EventDetailsCardOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDetailsCardOrgComponent]
    });
    fixture = TestBed.createComponent(EventDetailsCardOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
