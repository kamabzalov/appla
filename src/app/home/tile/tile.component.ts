import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'appla-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {

  @Input() tileColor: 'blue' | 'orange';

}
