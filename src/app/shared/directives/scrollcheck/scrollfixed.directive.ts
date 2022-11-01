import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[Scrollfixed]'
  
})
export class ScrollfixedDirective {

  constructor(private el: ElementRef) {
    
   }
   @HostListener("window:scroll", []) onWindowScroll() {
    // do some stuff here when the window is scrolled
   
          this.getOffset(this.el)
   }
    getOffset(el: ElementRef) {
    const rect =  el.nativeElement.getBoundingClientRect().top
    
      if(window.scrollY  > 570) {
        this.el.nativeElement.style.position = 'fixed'
        this.el.nativeElement.style.top = '105px'
        this.el.nativeElement.style.backgroundColor = 'white'
        this.el.nativeElement.style.width = '88%'  
        this.el.nativeElement.style.width = '-18px%'  

      }else {
        this.el.nativeElement.style.position = 'unset'
        this.el.nativeElement.style.top = 'unset'
      }
    
  }
}