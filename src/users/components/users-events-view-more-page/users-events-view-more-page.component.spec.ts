import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEventsViewMorePageComponent } from './users-events-view-more-page.component';

describe('UsersEventsViewMorePageComponent', () => {
  let component: UsersEventsViewMorePageComponent;
  let fixture: ComponentFixture<UsersEventsViewMorePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersEventsViewMorePageComponent]
    });
    fixture = TestBed.createComponent(UsersEventsViewMorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
