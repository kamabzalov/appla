import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMerchantComponent } from './favorite-merchant.component';

describe('AccountFavoriteMerchantComponent', () => {
  let component: FavoriteMerchantComponent;
  let fixture: ComponentFixture<FavoriteMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteMerchantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
