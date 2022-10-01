import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[applaErrorImage]',
})
export class ErrorImageDirective {
  private readonly defaultImage =
    'https://storage.googleapis.com/images-appla/products/no_image.png';

  constructor(private element: ElementRef) {}

  @HostListener('error')
  protected setDefaultImage() {
    (this.element.nativeElement as HTMLImageElement).src = this.defaultImage;
  }
}
