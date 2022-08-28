import { Directive, HostListener } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[applaCloseDropdown]',
})
export class CloseDropdownDirective {
  constructor(private el: NgbDropdown) {}

  @HostListener('click', ['$event.target'])
  private onElemClick() {
    this.el.close();
  }
}
