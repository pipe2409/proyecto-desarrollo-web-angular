import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoHabitacion } from '../../modelo/tipo-habitacion';
import { TipoHabitacionService } from '../../services/tipo-habitacion.service';

@Component({
  selector: 'app-tipos-habitacion-admin',
  templateUrl: './tipos-habitacion-admin.component.html',
  styleUrls: ['./tipos-habitacion-admin.component.scss']
})
export class TiposHabitacionAdminComponent implements OnInit {
  rooms: TipoHabitacion[] = [];

  constructor(
    private tipoHabitacionService: TipoHabitacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.rooms = this.tipoHabitacionService.getAll();
  }

  goToCreate(): void {
    this.router.navigate(['/tipos-habitacion/nuevo']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/tipos-habitacion/editar', id]);
  }

  deleteRoom(id: number): void {
    const ok = confirm('¿Eliminar este tipo de habitación?');
    if (ok) {
      this.tipoHabitacionService.delete(id);
      this.loadRooms();
    }
  }
}