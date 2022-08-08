import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFavoriteMerchantComponent } from './account-favorite-merchant.component';

describe('AccountFavoriteMerchantComponent', () => {
  let component: AccountFavoriteMerchantComponent;
  let fixture: ComponentFixture<AccountFavoriteMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountFavoriteMerchantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountFavoriteMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
