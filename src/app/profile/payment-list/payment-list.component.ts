import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-profile-page-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentListComponent {}
