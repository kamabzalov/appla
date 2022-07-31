import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TileComponent } from "./home/tile/tile.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TileComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
