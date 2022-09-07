import { ChangeDetectionStrategy, Component } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';

@Component({
  selector: 'appla-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartWidgetComponent {
  public faCartShopping = iconSet.faCartShopping;
}
