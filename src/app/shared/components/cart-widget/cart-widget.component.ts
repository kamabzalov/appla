import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';
import { BehaviorSubject } from 'rxjs';
import { RestService } from '@app/services/rest/rest.service';

@Component({
  selector: 'appla-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartWidgetComponent implements OnInit {
  public faCartShopping = iconSet.faCartShopping;
  protected cart$: BehaviorSubject<any>;

  constructor(private restService: RestService) {}

  public ngOnInit() {
    this.cart$ = this.restService.userState$;
  }

  protected goToCart() {
    window.location.href = 'https://checkout.angular.appla.cy/';
  }
}
