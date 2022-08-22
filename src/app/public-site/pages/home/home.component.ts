import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInTile } from '@app/public-site/product-category-tile/product-category-tile.component';
import { RestService } from '@app/services/rest/rest.service';

@Component({
  selector: 'appla-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public sampleSmartphones$: Observable<ProductInTile[]>;
  public sampleKitchenProducts$: Observable<ProductInTile[]>;
  public samplePersonalCareProducts$: Observable<ProductInTile[]>;
  public samplePersonalCleaningProducts$: Observable<ProductInTile[]>;

  constructor(private restService: RestService) {}

  public ngOnInit(): void {
    this.getSampleSmartphones();
    this.getSampleKitchenProducts();
    this.getSamplePersonalCareProducts();
    this.getCleaningProducts();
  }

  private getSampleSmartphones() {
    this.sampleSmartphones$ = this.restService.getSampleSmartphones();
  }

  private getSampleKitchenProducts() {
    this.sampleKitchenProducts$ = this.restService.getSampleKitchen();
  }

  private getSamplePersonalCareProducts() {
    this.samplePersonalCareProducts$ =
      this.restService.getSamplePersonalCareProducts();
  }

  private getCleaningProducts() {
    this.samplePersonalCleaningProducts$ =
      this.restService.getSampleCleaningProducts();
  }
}
