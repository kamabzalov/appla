import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePricesComponent } from './compare-prices.component';

describe('ComparePricesComponent', () => {
  let component: ComparePricesComponent;
  let fixture: ComponentFixture<ComparePricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparePricesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComparePricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
