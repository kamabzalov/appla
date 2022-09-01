import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'appla-profile-page',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {}
