import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }

}
