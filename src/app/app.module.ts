import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AssetHandlerComponent } from './asset-handler/asset-handler.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { NgScrollbarModule } from "ngx-scrollbar";
import { ElectronService, NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssetHandlerComponent,
    SidemenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgScrollbarModule
  ],
  providers: [ElectronService,NgxElectronModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
