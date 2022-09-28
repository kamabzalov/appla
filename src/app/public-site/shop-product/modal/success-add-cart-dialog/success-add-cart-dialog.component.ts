import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LanguageService } from '@app/services/language/language.service';

@Component({
  selector: 'appla-success-add-cart-dialog',
  templateUrl: './success-add-cart-dialog.component.html',
  styleUrls: ['./success-add-cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessAddCartDialogComponent implements OnInit {
  private appLang: string;

  constructor(
    protected activeModal: NgbActiveModal,
    private router: Router,
    private languageService: LanguageService
  ) {}

  public ngOnInit() {
    this.appLang = this.languageService.currentAppLang$.getValue()!.code;
  }

  protected goToCategory() {
    this.activeModal.dismiss();
    return this.router.navigate([this.appLang, 'category']);
  }
}
