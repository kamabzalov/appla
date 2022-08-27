import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RestService } from '@app/services/rest/rest.service';
import { Observable } from 'rxjs';

export interface Menu {
  childs1: FirstLevel[];
  childs2: FirstLevel[];
  childs3: FirstLevel[];
  commercial_products1: CommercialProduct[];
  commercial_products2: CommercialProduct[];
  commercial_products3: CommercialProduct[];
  id: number;
  name1: string;
  name2: string;
  name3: string;
}

interface FirstLevel {
  name: string;
  link: string;
  childs: SecondLevel[];
}

interface SecondLevel {
  name: string;
  value: string;
}

interface CommercialProduct {
  name: string;
  slug: string;
  store_slug: string;
  price: string;
  image: string;
}

@Component({
  selector: 'appla-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  protected menu$: Observable<Menu[]>;

  constructor(private restService: RestService) {}

  public ngOnInit(): void {
    this.menu$ = this.restService.getSiteMenu();
  }
}
