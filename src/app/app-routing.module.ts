import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/landing/pages/home/home.component';
import { TiposHabitacionAdminComponent } from './pages/tipos-habitacion-admin/tipos-habitacion-admin.component';
import { TipoHabitacionFormComponent } from './pages/tipo-habitacion-form/tipo-habitacion-form.component';
import { ServiciosAdminComponent } from './pages/servicios-admin/servicios-admin.component';
import { ServicioFormComponent } from './pages/servicios-form/servicios-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'mi-perfil', component: MiPerfilComponent },
  
  { path: 'tipos-habitacion', component: TiposHabitacionAdminComponent },
  { path: 'tipos-habitacion/nuevo', component: TipoHabitacionFormComponent },
  { path: 'tipos-habitacion/editar/:id', component: TipoHabitacionFormComponent },

  { path: 'servicios/admin', component: ServiciosAdminComponent },
  { path: 'servicios/admin/nuevo', component: ServicioFormComponent },
  { path: 'servicios/admin/editar/:id', component: ServicioFormComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}