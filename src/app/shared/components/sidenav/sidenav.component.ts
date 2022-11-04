import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from '@app/shared/components/modal/login-dialog/login-dialog.component';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { iconSet } from '@app/shared/utils/icons';
import { RestService } from '@app/services/rest/rest.service';
import { Observable } from 'rxjs';
import {
  FirstLevel,
  Menu,
} from '@app/shared/components/header/navigation/navigation.component';
import {
  AppLanguages,
  LanguageService,
} from '@app/services/language/language.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  protected faChevronLeft = iconSet.faChevronLeft;
  protected isCategoriesCollapsed = true;
  protected isLangCollapse = true;
  protected menu$: Observable<Menu[]>;
  protected currentLang: string;
  protected appLanguage: string;
  protected appId: number;
  protected mode: 'menu' | 'category' = 'menu';
  protected activeCategory: Menu | null;

  constructor(
    private modalService: NgbModal,
    private restService: RestService,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute,
    protected offcanvas: NgbOffcanvas
  ) {}

  public ngOnInit() {
    this.appLanguage = this.languageService.currentAppLang$.getValue()!.code;
    this.appId = this.languageService.currentAppLang$.getValue()!.id;
    this.menu$ = this.restService.getSiteMenu(this.appId);
  }

  protected openLoginModal() {
    this.modalService
      .open(LoginDialogComponent, { centered: true })
      .dismissed.subscribe();
  }

  protected closeSideNav() {
    this.offcanvas.dismiss();
  }

  protected setLang(langCode?: string) {
    let newUrl;
    if (langCode) {
      this.currentLang = langCode;
      this.languageService.setLanguage(langCode);
      const lang_id = AppLanguages.find(lang => lang.code === langCode)!.id;
      this.restService.isAuthorized(lang_id).subscribe();
      const queryParams = this.route.snapshot.queryParams;
      const urlPath = decodeURIComponent(this.router.url)
        .split('/')
        // eslint-disable-next-line no-magic-numbers
        .slice(2)
        .map(item => {
          // eslint-disable-next-line no-magic-numbers
          if (item.split('?').length > 1) {
            return item.split('?')[0];
          }
          return item;
        });
      if (urlPath.length) {
        newUrl = `/${langCode}/${urlPath.join('/')}`;
      } else {
        newUrl = `/${langCode}`;
      }
      if (queryParams) {
        this.router.navigate([newUrl], { queryParams: queryParams });
      } else {
        this.router.navigate([newUrl]);
      }
    }
    this.offcanvas.dismiss();
  }

  protected openSubcategories(category: Menu) {
    this.activeCategory = category;
    this.mode = 'category';
  }

  protected closeCategoryMenu() {
    this.mode = 'menu';
    this.activeCategory = null;
  }

  protected toggleMore(menuLevel: FirstLevel) {
    menuLevel.toggle = !menuLevel.toggle;
  }

  protected goToCart() {
    window.location.href = 'https://checkout.angular.appla.cy/';
  }
}
