import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDisplayComponent } from './admin-display.component';

describe('AdminDisplayComponent', () => {
  let component: AdminDisplayComponent;
  let fixture: ComponentFixture<AdminDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDisplayComponent]
    });
    fixture = TestBed.createComponent(AdminDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
