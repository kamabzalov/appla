import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-product-category-tile',
  templateUrl: './product-category-tile.component.html',
  styleUrls: ['./product-category-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoryTileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}