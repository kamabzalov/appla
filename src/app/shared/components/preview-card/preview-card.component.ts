import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryProduct } from '@app/shop-category/category-page/category-page.component';

@Component({
  selector: 'appla-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewCardComponent {
  @Input() public product: CategoryProduct;
}
