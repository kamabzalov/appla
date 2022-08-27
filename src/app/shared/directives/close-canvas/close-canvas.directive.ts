import { Directive, HostListener } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[applaCloseCanvas]',
})
export class CloseCanvasDirective {
  constructor(private offCanvas: NgbOffcanvas) {}

  @HostListener('click', ['$event.target'])
  private onElemClick() {
    this.offCanvas.dismiss();
  }
}
