import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  SearchCategory,
  SearchProduct,
} from '@app/search/search-results/search-results.component';
import { RestService } from '@app/services/rest/rest.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'appla-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultCardComponent implements OnDestroy {
  @Input() public category: SearchCategory;
  @Input() public product: SearchProduct;
  private subscription: Subscription;

  constructor(private restService: RestService, private router: Router) {}

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected goToProduct(product: SearchProduct) {
    this.subscription = this.restService
      .getProductByMasterId(product.master_product_id)
      .subscribe(result => {
        if (result.length === 1) {
          this.router.navigate([
            `/product/${result[0].store_slug}/${result[0].product_slug}`,
          ]);
        }
      });
  }
}
