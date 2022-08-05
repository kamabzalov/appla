import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-account-favorite-merchant',
  templateUrl: './account-favorite-merchant.component.html',
  styleUrls: ['./account-favorite-merchant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountFavoriteMerchantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
