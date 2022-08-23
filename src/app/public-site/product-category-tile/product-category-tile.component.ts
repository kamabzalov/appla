import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface ProductInTile {
  master_product_id: string;
  name1: string;
  name2: string;
  name3: string;
  picture: string;
  price: number;
  product_slug: string;
  slug: string;
  store_slug: string;
  url: string;
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
