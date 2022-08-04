import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRefundComponent } from './account-refund.component';

describe('AccountRefundComponent', () => {
  let component: AccountRefundComponent;
  let fixture: ComponentFixture<AccountRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
