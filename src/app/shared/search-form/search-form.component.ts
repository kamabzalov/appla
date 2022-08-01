import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'appla-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {

  faSearch = faMagnifyingGlass

  constructor() {
  }

  ngOnInit(): void {
  }

}
