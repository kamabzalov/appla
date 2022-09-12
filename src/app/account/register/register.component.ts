import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RestService } from '@app/services/rest/rest.service';

@Component({
  selector: 'appla-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  protected email: string;

  constructor(private restService: RestService) {}

  protected sighUp() {
    this.restService.register(this.email).subscribe(data => console.log(data));
  }
}
