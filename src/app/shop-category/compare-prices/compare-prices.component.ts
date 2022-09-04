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

export interface ProductOffer {
  category: ProductOfferCategory;
  master_product_info: ProductOfferInfo;
  stories: ProductOfferStores[];
}

interface ProductOfferCategory {
  category_id: number;
  parent_id: number;
  name1: string;
  name2: string;
  name3: string;
  picture: string;
  level: number;
  date_update: Date;
  user_update: number;
  status: number;
  slug: string;
  specification_data: any;
  search_field: any;
  product_variant: any;
  specification_data_ru: any;
  search_field_ru: any;
  specification_data_gr: any;
  search_field_gr: any;
  en_title: string;
  gr_title: string;
  ru_title: string;
  en_description: string;
  gr_description: string;
  ru_description: string;
}

interface ProductOfferInfo {
  master_product_id: number;
  category_id: number;
  sku: number;
  gtin: string;
  name1: string;
  name2: string;
  name3: string;
  long_description1: string;
  long_description2: string;
  long_description3: string;
  short_description1: string;
  short_description2: string;
  short_description3: string;
  weight: number;
  weight_unit: number;
  length: number;
  width: number;
  height: number;
  item_model_number: number;
  manufacturer: string;
  technical_detail: any;
  date_update: Date;
  user_update: number;
  status: number;
  picture: string;
  price: number;
  type_id: number;
  store_id: number;
  position: string;
  en_title: string;
  gr_title: string;
  ru_title: string;
  en_description: string;
  gr_description: string;
  ru_description: string;
  en_product_title: string;
  gr_product_title: string;
  ru_product_title: string;
  en_product_description: string;
  gr_product_description: string;
  ru_product_description: string;
}

interface ProductOfferStores {}

@Component({
  selector: 'appla-compare-prices',
  templateUrl: './compare-prices.component.html',
  styleUrls: ['./compare-prices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparePricesComponent implements OnInit, OnDestroy {
  protected faTruck = iconSet.faTruck;
  protected productOffer$: Observable<ProductOffer>;
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
