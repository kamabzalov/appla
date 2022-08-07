import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSidebarComponent {
}
