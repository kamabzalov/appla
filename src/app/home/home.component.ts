import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { iconSet } from '@app/shared/utils/icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '@app/services/rest/rest.service';
import { Observable } from 'rxjs';
import { ProductInTile } from '@app/home/product-category-tile/product-category-tile.component';

@Component({
  selector: 'appla-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public faStar: IconDefinition = iconSet.faStar;
  public faEye: IconDefinition = iconSet.faEye;

  public sampleSmartphones$: Observable<ProductInTile[]>;
  public sampleKitchenProducts$: Observable<ProductInTile[]>;
  public samplePersonalCareProducts$: Observable<ProductInTile[]>;
  public samplePersonalCleaningProducts$: Observable<ProductInTile[]>;

  constructor(private restService: RestService) {}

  public ngOnInit() {
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
