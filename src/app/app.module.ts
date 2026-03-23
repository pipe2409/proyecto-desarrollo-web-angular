import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // 👈 cambia AppComponent por NavbarComponent

@NgModule({
  declarations: [
    AppComponent // 👈 cambia aquí también
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] // 👈 y aquí
})
export class AppModule { }