import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appla-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartWidgetComponent {
  faCartShopping = faCartShopping;
}
