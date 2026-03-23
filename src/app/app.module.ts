import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // 👈 cambia AppComponent por NavbarComponent

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }