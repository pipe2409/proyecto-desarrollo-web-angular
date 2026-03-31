import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/landing/pages/home/home.component';
import { TiposHabitacionAdminComponent } from './pages/tipos-habitacion-admin/tipos-habitacion-admin.component';
import { TipoHabitacionFormComponent } from './pages/tipo-habitacion-form/tipo-habitacion-form.component';
import { ServiciosAdminComponent } from './pages/servicios-admin/servicios-admin.component';
import { ServicioFormComponent } from './pages/servicios-form/servicios-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tipos-habitacion', component: TiposHabitacionAdminComponent },
  { path: 'tipos-habitacion/nuevo', component: TipoHabitacionFormComponent },
  { path: 'tipos-habitacion/editar/:id', component: TipoHabitacionFormComponent },
  { path: 'servicios/admin', component: ServiciosAdminComponent },
  { path: 'servicios/admin/nuevo', component: ServicioFormComponent },
  { path: 'servicios/admin/editar/:id', component: ServicioFormComponent },
  { path: 'tipos-habitacion/nuevo', component: TipoHabitacionFormComponent },
  { path: 'tipos-habitacion/editar/:id', component: TipoHabitacionFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}