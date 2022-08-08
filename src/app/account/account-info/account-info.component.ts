import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountInfoComponent {}
