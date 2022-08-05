import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RestService } from "../../services/rest/rest.service";
import { Observable } from "rxjs";

@Component({
  selector: 'appla-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  menu$: Observable<any>;

  constructor(private restService: RestService) {

  }

  ngOnInit(): void {
    // this.menu$ = this.restService.getSiteMenu();
  }

}
