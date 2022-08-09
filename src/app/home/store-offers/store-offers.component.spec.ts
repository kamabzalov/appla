import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOffersComponent } from './store-offers.component';

describe('StoreOffersComponent', () => {
  let component: StoreOffersComponent;
  let fixture: ComponentFixture<StoreOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreOffersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
