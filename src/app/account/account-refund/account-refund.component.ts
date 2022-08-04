import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-account-refund',
  templateUrl: './account-refund.component.html',
  styleUrls: ['./account-refund.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountRefundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
