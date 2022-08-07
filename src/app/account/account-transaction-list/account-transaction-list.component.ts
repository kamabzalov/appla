import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-account-transaction-list',
  templateUrl: './account-transaction-list.component.html',
  styleUrls: ['./account-transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountTransactionListComponent {
}
