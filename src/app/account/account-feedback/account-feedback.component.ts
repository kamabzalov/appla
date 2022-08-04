import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-account-feedback',
  templateUrl: './account-feedback.component.html',
  styleUrls: ['./account-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountFeedbackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
