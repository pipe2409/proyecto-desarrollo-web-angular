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
    this.loadServicios();
  }

  loadServicios(): void {
    this.serviciosService.getAll().subscribe({
      next: (data) => (this.servicios = data),
      error: (err) => console.error('Error cargando servicios:', err),
    });
  }

  goToCreate(): void {
    this.router.navigate(['/servicios/admin/nuevo']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/servicios/admin/editar', id]);
  }

  deleteServicio(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este servicio?')) return;
    this.serviciosService.delete(id).subscribe({
      next: () => this.loadServicios(),
      error: (err) => console.error('Error eliminando:', err),
    });
  }
}