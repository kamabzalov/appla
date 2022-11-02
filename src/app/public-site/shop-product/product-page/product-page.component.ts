import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { SeoService } from '@app/services/seo/seo.service';

export interface Product {
  meta: string;
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
  delivery_days: number;
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
  protected fullImage: string;
  protected thumbImage: string;
  protected appLang: string;
  protected productVariant: ProductVariant;

  protected readonly fullImageUrl =
    'https://storage.googleapis.com/images-appla/production/thumbs_800/';
  protected readonly thumbImageUrl =
    'https://storage.googleapis.com/images-appla/production/thumbs_400/';

  protected readonly defaultFullImageUrl =
    'https://storage.googleapis.com/images-appla/products/no_image150.png';
  protected readonly defaultThumbImageUrl =
    'https://storage.googleapis.com/images-appla/products/no_image400.png';
  protected mainImage: string;
  private productPicture: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: RestService,
    private languageService: LanguageService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService,
    private localizeRouterService: LocalizeRouterService,
    private seoService: SeoService
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
    if (this.productQuantity <= 1) {
      return;
    }
    this.productQuantity--;
  }

  protected increaseQuantity(productVariant: ProductVariant, qty: number) {
    if (
      (productVariant && !productVariant?.quantity) ||
      productVariant?.quantity === this.productQuantity
    ) {
      return;
    }
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
    this.mainImage = $event;
    this.cdr.markForCheck();
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
          this.modalService
            .open(SuccessAddCartDialogComponent)
            .dismissed.subscribe(_ =>
              this.restService.isAuthorized().subscribe()
            );
        }
      });
  }

  protected followStore(merchantId: number) {
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
      this.restService.followStore(merchantId).subscribe(res => {
        this.toastService.show(res);
      });
    });
  }

  protected setVariant() {
    this.productQuantity = 1;
  }

  private getProductData(
    storeSlug: string,
    productSlug: string
  ): Observable<Product> {
    return this.restService.getProductBySlug(storeSlug, productSlug).pipe(
      tap(res => {
        this.productPicture = res.product.picture[0];
        this.mainImage = res.product.picture[0];
        this.cdr.markForCheck();
        this.fullImage = this.fullImageUrl + this.productPicture;
        this.thumbImage = this.thumbImageUrl + this.productPicture;
        this.productVariant = res.product_variant[0];
        this.seoService.addLinkTag(res.canonical_link.href);
        this.seoService.setTitle(res.product.name);
        this.seoService.setMeta('robots', 'index, follow');
        this.seoService.setGoogleProductScheme(res.meta);

        this.seoService.setMeta('twitter:card', 'product');
        this.seoService.setMeta('twitter:site', 'https://appla.cy/');
        this.seoService.setMeta('twitter:creator', 'https://appla.cy/');
        this.seoService.setMeta('twitter:domain', 'https://appla.cy/');
        this.seoService.setMeta('twitter:title', res.title);
        this.seoService.setMeta('twitter:description', res.description);
        this.seoService.setMeta('twitter:image', this.fullImage);
        this.seoService.setMeta('twitter:label1', 'Lowest Price');
        this.seoService.setMeta('twitter:data1', res.product.price + '€');
        this.seoService.setMeta('twitter:label2', res.product.store_name);
        this.seoService.setMeta('twitter:data2', '1 Shop');

        this.seoService.setMetaOpenGraph('og:title', res.title);
        this.seoService.setMetaOpenGraph('og:url', this.router.url);
        this.seoService.setMetaOpenGraph('og:site_name', 'https://appla.cy/');
        this.seoService.setMetaOpenGraph('og:type', 'product');
        this.seoService.setMetaOpenGraph('og:description', res.description);
        this.seoService.setMetaOpenGraph('og:image', this.fullImage);
      })
    );
  }
}
