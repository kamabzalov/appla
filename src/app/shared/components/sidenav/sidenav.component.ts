import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginComponent } from '@app/shared/components/modal/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iconSet } from '@app/shared/utils/icons';
import { RestService } from '@app/services/rest/rest.service';
import { Observable } from 'rxjs';
import { Menu } from '@app/shared/components/header/navigation/navigation.component';

@Component({
  selector: 'appla-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  protected faPhone = iconSet.faPhone;
  protected faEnvelope = iconSet.faEnvelope;
  protected menu$: Observable<Menu[]>;
  protected isCategoriesCollapsed = true;
  protected isLangCollapse = true;

  constructor(
    private modalService: NgbModal,
    private restService: RestService
  ) {}

  public ngOnInit() {
    this.menu$ = this.restService.getSiteMenu();
  }

  public openLoginModal() {
    this.modalService.open(LoginComponent);
  }
}
