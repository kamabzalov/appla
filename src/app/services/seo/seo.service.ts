import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {}

  public addLinkTag(url: string) {
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.document.head.appendChild(link);
    link.setAttribute('href', url);
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  public setMeta(name: string, content: string) {
    this.metaService.addTag({ name, content });
  }

  public setMetaOpenGraph(property: string, content: string) {
    this.metaService.addTag({ property, content });
  }

  public setGoogleProductScheme(schema: string) {
    const scriptTag = this.document.createElement('script');
    scriptTag.setAttribute('type', 'application/ld+json');
    scriptTag.textContent = schema;
    this.document.head.appendChild(scriptTag);
  }
}
