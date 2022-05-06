import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AssetHandlerComponent } from './asset-handler/asset-handler.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { NgScrollbarModule } from "ngx-scrollbar";
import { ElectronService } from 'ngx-electron';
import { CommonService } from './common.service';
import { MillToTimePipe } from './mill-to-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssetHandlerComponent,
    SidemenuComponent,
    MillToTimePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgScrollbarModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
