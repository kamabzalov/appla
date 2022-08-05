import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-account-wishlist',
  templateUrl: './account-wishlist.component.html',
  styleUrls: ['./account-wishlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountWishlistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
