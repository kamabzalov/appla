import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { iconSet } from '@app/shared/utils/icons';
import { RestService } from '@app/services/rest/rest.service';
import { Observable } from 'rxjs';
import { Menu } from '@app/shared/components/header/navigation/navigation.component';
import { LanguageService } from '@app/services/language/language.service';

@Component({
  selector: 'appla-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  protected faPhone = iconSet.faPhone;
  protected faEnvelope = iconSet.faEnvelope;
  protected faCart = iconSet.faCartShopping;
  protected faHouse = iconSet.faHouse;
  protected faBookOpen = iconSet.faBookOpen;
  protected faEarthAmericas = iconSet.faEarthAmericas;
  protected faCircleInfo = iconSet.faCircleInfo;
  protected isCategoriesCollapsed = true;
  protected isLangCollapse = true;
  protected menu$: Observable<Menu[]>;
  protected appLanguage: string;

  constructor(
    private modalService: NgbModal,
    private restService: RestService,
    private languageService: LanguageService,
    protected offcanvas: NgbOffcanvas
  ) {}

  public ngOnInit() {
    this.appLanguage = this.languageService.currentAppLang$.getValue().code;
    this.menu$ = this.restService.getSiteMenu();
  }

  protected openLoginModal() {
    this.modalService.open(LoginComponent);
  }

  protected closeSideNav() {
    this.offcanvas.dismiss();
  }
}
