import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '@app/services/rest/rest.service';

@Component({
  selector: 'appla-compare-prices',
  templateUrl: './compare-prices.component.html',
  styleUrls: ['./compare-prices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparePricesComponent implements OnInit {
  public faTruck = faTruck;

  private productSlugSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
  ) {}

  public ngOnInit() {
    this.productSlugSubscription = this.route.url.subscribe(res => {
      const slug = res[1].path;
      if (slug) {
        this.restService.getProductOffer(slug).subscribe();
      }
    });
  }
}
