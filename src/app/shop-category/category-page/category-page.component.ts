import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faChevronRight, faTags } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appla-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent implements OnInit {

  faChevronRight = faChevronRight;
  faTags = faTags;

  constructor() {
  }

  ngOnInit(): void {
  }

}
