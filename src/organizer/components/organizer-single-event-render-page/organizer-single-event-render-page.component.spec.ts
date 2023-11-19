import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerSingleEventRenderPageComponent } from './organizer-single-event-render-page.component';

describe('OrganizerSingleEventRenderPageComponent', () => {
  let component: OrganizerSingleEventRenderPageComponent;
  let fixture: ComponentFixture<OrganizerSingleEventRenderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerSingleEventRenderPageComponent]
    });
    fixture = TestBed.createComponent(OrganizerSingleEventRenderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
