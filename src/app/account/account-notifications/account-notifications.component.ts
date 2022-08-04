import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-account-notifications',
  templateUrl: './account-notifications.component.html',
  styleUrls: ['./account-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountNotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
