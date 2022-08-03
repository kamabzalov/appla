import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appla-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {

  faPlus = faPlus;
  faMinus = faMinus;

  constructor() { }

  ngOnInit(): void {
  }

}
