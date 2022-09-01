import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-profile-page-transaction-list',
  templateUrl: './transaction-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent {}
