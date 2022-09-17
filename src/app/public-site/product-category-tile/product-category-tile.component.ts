import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface ProductInTile {
  category_name: string;
  master_product_id: number;
  name: string;
  picture: string;
  price: number;
  product_slug: string;
  slug: string;
  store_slug: string;
}

@Component({
  selector: 'appla-product-category-tile',
  templateUrl: './product-category-tile.component.html',
  styleUrls: ['./product-category-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategoryTileComponent {
  @Input() public link: string;
  @Input() public title: string;
  @Input() public categoryId: string;
  @Input() public entities: ProductInTile[];
}
