import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-account-chat',
  templateUrl: './account-chat.component.html',
  styleUrls: ['./account-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}