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
// constructor(
//   private localizeRouterService: LocalizeRouterService,
//   private restService: RestService,
//   private router: Router
// ) {}
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
