import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerMessagesComponent } from './organizer-messages.component';

describe('OrganizerMessagesComponent', () => {
  let component: OrganizerMessagesComponent;
  let fixture: ComponentFixture<OrganizerMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerMessagesComponent]
    });
    fixture = TestBed.createComponent(OrganizerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
