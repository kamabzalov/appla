import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalProductImagesComponent } from './additional-product-images.component';

describe('AdditionalProductImagesComponent', () => {
  let component: AdditionalProductImagesComponent;
  let fixture: ComponentFixture<AdditionalProductImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalProductImagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalProductImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
