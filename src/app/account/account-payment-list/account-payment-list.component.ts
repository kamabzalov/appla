import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-account-payment-list',
  templateUrl: './account-payment-list.component.html',
  styleUrls: ['./account-payment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPaymentListComponent {}
