import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingleEventRenderPageComponent } from './user-single-event-render-page.component';

describe('UserSingleEventRenderPageComponent', () => {
  let component: UserSingleEventRenderPageComponent;
  let fixture: ComponentFixture<UserSingleEventRenderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSingleEventRenderPageComponent]
    });
    fixture = TestBed.createComponent(UserSingleEventRenderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
