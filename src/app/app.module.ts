import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* 🔥 IMPORTANTE: tu módulo de landing */
import { LandingModule } from './features/landing/landing.module';

@NgModule({
  declarations: [
    AppComponent
    // ⚠️ NO pongas aquí componentes de landing
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    /* 🔥 AQUÍ se conecta toda tu landing */
    LandingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }