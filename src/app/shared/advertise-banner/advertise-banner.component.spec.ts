import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseBannerComponent } from './advertise-banner.component';

describe('AdvertiseBannerComponent', () => {
  let component: AdvertiseBannerComponent;
  let fixture: ComponentFixture<AdvertiseBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiseBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertiseBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
