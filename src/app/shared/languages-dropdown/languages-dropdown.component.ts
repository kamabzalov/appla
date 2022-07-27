import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'appla-languages-dropdown',
  templateUrl: './languages-dropdown.component.html',
  styleUrls: ['./languages-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagesDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
