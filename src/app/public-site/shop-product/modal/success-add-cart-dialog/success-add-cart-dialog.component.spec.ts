import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessAddCartDialogComponent } from './success-add-cart-dialog.component';

describe('SuccessAddCartDialogComponent', () => {
  let component: SuccessAddCartDialogComponent;
  let fixture: ComponentFixture<SuccessAddCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessAddCartDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessAddCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
