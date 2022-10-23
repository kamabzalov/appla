import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';
import { Observable, switchMap, tap } from 'rxjs';
import { iconSet } from '@app/shared/utils/icons';
import { LanguageService } from '@app/services/language/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '@app/shared/components/modal/confirm-dialog/confirm-dialog.component';
import { ToastService } from '@app/services/toast/toast.service';
import { SuccessAddCartDialogComponent } from '@app/public-site/shop-product/modal/success-add-cart-dialog/success-add-cart-dialog.component';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface Product {
  title: string;
  description: string;
  page: string;
  product: ProductDetails;
  product_variant: ProductVariant[];
  arr_cats: ProductCategory[];
  category_slug: string;
  fav_store: number;
  wish: number;
  feedbacks: any[];
  feedbacks_count: number;
  sold: number;
  product_star: number;
  seller_rating: number;
  seller_feedback: number;
  additional_header: string;
  similar_short: SimilarProduct[];
  technical_detail: { [key: string]: any };
  product_detail: boolean;
  canonical_link: CanonicalData;
  user: string;
  is_login: boolean;
}

export interface SimilarProduct {
  category_id: number;
  discount: number;
  name: string;
  picture: string;
  price: number;
  product_id: number;
  product_slug: string;
  qty: number;
  sold_count: number;
  stars: number;
  store_id: number;
  store_slug: string;
}

export interface ProductVariant {
  product_variant_id: number;
  product_id: number;
  product_variant: { [key: string]: any };
  price: number;
  quantity: number;
  sku: string;
  store_id: number;
  user_create: number;
  user_update: number;
  date_create: Date;
  date_update: Date;
  status: number;
}

interface ProductDetails {
  product_id: number;
  name: string;
  qty: number;
  price: number;
  technical_detail: { [key: string]: any };
  master_product_id: number;
  picture: string[];
  weight: number;
  length: number;
  width: number;
  height: number;
  weight_unit: number;
  min_order: number;
  delivery_service: number;
  item_model_number: number;
  manufacturer: string;
  condition: number;
  description: string;
  product_slug: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  store_id: number;
  store_name: string;
  store_slug: string;
  state: string;
  store_avatar: string;
  store_city: number;
  product_variant_id: number;
}

interface ProductCategory {
  cat_id: number;
  name: string;
  slug: string;
}

interface CanonicalData {
  rel: string;
  href: string;
}

@UntilDestroy()
@Component({
  selector: 'appla-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  public faPlus = iconSet.faPlus;
  public faMinus = iconSet.faMinus;
  public faStar = iconSet.faStar;
  // eslint-disable-next-line no-magic-numbers
  public productQuantity: number = 1;
  protected product$: Observable<Product>;
  protected mainPage: string;
  protected appLang: string;
  protected productVariant: ProductVariant;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService,
    private languageService: LanguageService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private localizeRouterService: LocalizeRouterService
  ) {}

  public ngOnInit(): void {
    this.appLang = this.localizeRouterService.parser.currentLang;
    this.product$ = this.route.url.pipe(
      untilDestroyed(this),
      switchMap(url => {
        return this.getProductData(url[0].path, url[1].path);
      })
    );
  }

  protected decreaseQuantity() {
    // eslint-disable-next-line no-magic-numbers
    if (this.productQuantity === 1) {
      return;
    }
    this.productQuantity--;
  }

  protected increaseQuantity(qty: number) {
    if (this.productQuantity === qty) {
      return;
    }
    this.productQuantity++;
  }

  protected setMax(qty: number) {
    if (this.productVariant) {
      this.productQuantity = this.productVariant.quantity;
    } else {
      this.productQuantity = qty;
    }
  }

  protected setActive($event: string) {
    this.mainPage = $event;
  }

  protected addToCart(
    productQuantity: number,
    product_id: number,
    productVariant?: ProductVariant
  ) {
    this.restService
      .addToCart(productQuantity, product_id, productVariant)
      .subscribe(res => {
        if (res.status === 'success') {
          this.modalService.open(SuccessAddCartDialogComponent);
        }
      });
  }

  protected followStore(userId: number, merchantId: number) {
    const confirmModal = this.modalService.open(ConfirmDialogComponent, {
      centered: true,
    });
    const text =
      this.appLang === 'en'
        ? 'Follow this store?'
        : 'ru'
        ? 'Подписаться на этот магазин?'
        : '';
    confirmModal.componentInstance.text = text;
    confirmModal.closed.subscribe(_ => {
      this.restService.followStore(userId, merchantId).subscribe(res => {
        this.toastService.show(res);
      });
    });
  }

  protected setVariant(productVariant: ProductVariant) {}

  private getProductData(
    storeSlug: string,
    productSlug: string
  ): Observable<Product> {
    return this.restService.getProductBySlug(storeSlug, productSlug).pipe(
      tap(res => {
        this.mainPage = res.product.picture[0];
        this.productVariant = res.product_variant[0];
      })
    );
  }
}
