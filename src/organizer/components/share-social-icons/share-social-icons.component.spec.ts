import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSocialIconsComponent } from './share-social-icons.component';

describe('ShareSocialIconsComponent', () => {
  let component: ShareSocialIconsComponent;
  let fixture: ComponentFixture<ShareSocialIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareSocialIconsComponent]
    });
    fixture = TestBed.createComponent(ShareSocialIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
