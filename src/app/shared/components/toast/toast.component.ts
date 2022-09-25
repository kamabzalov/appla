import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '@app/services/toast/toast.service';

@Component({
  selector: 'appla-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  public toasts: any[] = [];

  constructor(private toastService: ToastService) {}

  public ngOnInit() {
    this.toasts = this.toastService.getToasts();
  }

  protected isTemplate(toast: any) {
    console.log(toast);
    return toast.textOrTpl instanceof TemplateRef;
  }

  protected remove(toast: any) {}
}
