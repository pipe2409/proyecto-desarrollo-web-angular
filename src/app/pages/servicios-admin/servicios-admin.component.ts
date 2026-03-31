import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Servicio } from '../../modelo/servicio';

@Component({
  selector: 'app-servicios-admin',
  templateUrl: './servicios-admin.component.html',
})
export class ServiciosAdminComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí luego conectas tu servicio HTTP
    this.servicios = [ /* datos de prueba o llamada al backend */ ];
  }

  goToCreate() {
    this.router.navigate(['/servicios/crear']);
  }

  goToEdit(id: number) {
    this.router.navigate(['/servicios/editar', id]);
  }

  deleteServicio(id: number) {
    this.servicios = this.servicios.filter(s => s.id !== id);
  }
}