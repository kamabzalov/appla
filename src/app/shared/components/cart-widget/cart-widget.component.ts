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
  protected productCount$: BehaviorSubject<number>;

  constructor(private restService: RestService) {}

  public ngOnInit() {
    this.productCount$ = this.restService.cart$;
  }
}
