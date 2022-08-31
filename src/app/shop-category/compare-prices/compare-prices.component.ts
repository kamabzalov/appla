import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { iconSet } from '@app/shared/utils/icons';
import { combineLatest, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'appla-compare-prices',
  templateUrl: './compare-prices.component.html',
  styleUrls: ['./compare-prices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparePricesComponent implements OnInit, OnDestroy {
  protected faTruck = iconSet.faTruck;
  protected productOffer$: Observable<any>;
  private productOfferUrl$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
  ) {}

  public ngOnInit() {
    this.productOfferUrl$ = combineLatest(
      this.route.queryParams,
      this.route.params
    ).subscribe(res => {
      // eslint-disable-next-line no-magic-numbers
      if (res && res.length > 1) {
        const mdi = res[0]['mpi'];
        const productSlug = res[1]['slug'];
        this.productOffer$ = this.restService.getProductOffer(productSlug, mdi);
      }
    });
  }

  public ngOnDestroy() {
    if (this.productOfferUrl$) {
      this.productOfferUrl$.unsubscribe();
    }
  }
}
