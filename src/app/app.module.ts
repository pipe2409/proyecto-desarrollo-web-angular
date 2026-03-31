import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from './features/landing/landing.module';
import { TiposHabitacionAdminComponent } from './pages/tipos-habitacion-admin/tipos-habitacion-admin.component';
import { TipoHabitacionFormComponent } from './pages/tipo-habitacion-form/tipo-habitacion-form.component';
import { TestimonialsCardsComponent } from './features/landing/components/testimonials/testimonials-cards/testimonials-cards.component';
import { ServiciosAdminComponent } from './pages/servicios-admin/servicios-admin.component';
import { ServiciosFormsComponent } from './pages/servicios-forms/servicios-forms.component';



@NgModule({
  declarations: [
    AppComponent,
    TiposHabitacionAdminComponent,
    TipoHabitacionFormComponent,
    ServiciosAdminComponent,
    ServiciosFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }