import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {}
