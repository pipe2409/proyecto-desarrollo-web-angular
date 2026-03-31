import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Servicio } from '../../modelo/servicio';
import { SERVICES_DATA } from '../../features/landing/data/servicio.data';

@Component({
  selector: 'app-servicios-admin',
  templateUrl: './servicios-admin.component.html',
})
export class ServiciosAdminComponent {
  servicios: Servicio[] = SERVICES_DATA; // ← así de simple

  constructor(private router: Router) {}

  goToCreate() {
  this.router.navigate(['/servicios/admin/nuevo']);
}

goToEdit(id: number) {
  this.router.navigate(['/servicios/admin/editar', id]);
}

  deleteServicio(id: number) {
    this.servicios = this.servicios.filter(s => s.id !== id);
  }
}