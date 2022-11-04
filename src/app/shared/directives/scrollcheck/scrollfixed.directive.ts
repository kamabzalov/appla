import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[Scrollfixed]',
})
export class ScrollfixedDirective {
  constructor(private el: ElementRef) {}
  @HostListener('window:scroll', []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    if (window.innerWidth > 991 && window.innerHeight > 0) {
      this.getOffset(this.el);
    } else if (window.scrollY > 670 && window.innerWidth < 991) {
      this.el.nativeElement.style.position = 'fixed';
      this.el.nativeElement.style.top = 0;
      this.el.nativeElement.style.width = '100%';
      this.el.nativeElement.style.zIndex = 99;
      this.el.nativeElement.style.backgroundColor = 'white';
    } else {
      this.el.nativeElement.style.position = 'unset';
      this.el.nativeElement.style.top = 'unset';
    }
  }
  getOffset(el: ElementRef) {
    if (window.scrollY > 570) {
      this.el.nativeElement.style.position = 'fixed';
      this.el.nativeElement.style.top = '103px';
      this.el.nativeElement.style.backgroundColor = 'white';
      this.el.nativeElement.style.width = '62%';
    } else {
      this.el.nativeElement.style.position = 'unset';
      this.el.nativeElement.style.top = 'unset';
      this.el.nativeElement.style.width = '100%';
      this.el.nativeElement.style.backgroundColor = 'white';
    }
  }
}
