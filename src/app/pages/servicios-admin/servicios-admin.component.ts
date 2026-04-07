import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from '../../modelo/servicio';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-servicios-admin',
  templateUrl: './servicios-admin.component.html',
})
export class ServiciosAdminComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(
    private router: Router,
    private serviciosService: ServiciosService
  ) {}

  ngOnInit(): void {
    this.servicios = this.serviciosService.getAll();
  }

  goToCreate(): void {
    this.router.navigate(['/servicios/admin/nuevo']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/servicios/admin/editar', id]);
  }

  deleteServicio(id: number): void {
    this.serviciosService.delete(id);
    this.servicios = this.serviciosService.getAll();
  }
}