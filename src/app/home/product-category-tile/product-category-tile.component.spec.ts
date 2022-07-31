import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryTileComponent } from './product-category-tile.component';

describe('ProductCategoryTileComponent', () => {
  let component: ProductCategoryTileComponent;
  let fixture: ComponentFixture<ProductCategoryTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
