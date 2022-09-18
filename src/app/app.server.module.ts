import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';
import { routes } from './app-routing.module';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
} from '@gilsdav/ngx-translate-router';
import { Location } from '@angular/common';
import { localizeServerLoaderFactory } from '@app/localize-server.loader';
import { translateServerLoaderFactory } from '@app/translate-server.loader';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      defaultLanguage: 'el',
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState],
      },
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeServerLoaderFactory,
        deps: [
          TranslateService,
          Location,
          LocalizeRouterSettings,
          TransferState,
        ],
      },
      initialNavigation: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
