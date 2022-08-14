import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RestService } from '@app/services/rest/rest.service';
import { Observable } from 'rxjs';

export interface Menu {
  categories1: string;
  categories2: string;
  categories3: string;
  commercial_products1: string;
  commercial_products2: string;
  commercial_products3: string;
  id: string;
  tab_name1: string;
  tab_name2: string;
  tab_name3: string;
}

@Component({
  selector: 'appla-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  public menu$: Observable<Menu[]>;

  constructor(private restService: RestService) {}

  public ngOnInit(): void {
    this.menu$ = this.restService.getSiteMenu();
  }
}
