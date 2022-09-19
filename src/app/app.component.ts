import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'appla-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public toastService: ToastService) {}

  protected isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
