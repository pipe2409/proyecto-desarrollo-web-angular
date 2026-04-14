import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Habitacion, TipoHabitacion } from '../../modelo/habitacion';
import { HabitacionService } from '../../services/habitacion.service';
import { TipoHabitacionService } from '../../services/tipo-habitacion.service';

@Component({
  selector: 'app-habitaciones-admin',
  templateUrl: './habitaciones-admin.component.html',
  styleUrls: ['./habitaciones-admin.component.scss']
})
export class HabitacionesAdminComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  tiposHabitacion: TipoHabitacion[] = [];
  tipoIdSeleccionado: number | null = null;
  cargando = true;
  error = '';
  okMessage = '';
  errMessage = '';

  constructor(
    private habitacionService: HabitacionService,
    private tipoService: TipoHabitacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTipos();
  }

  onTipoChange(event: any): void {
  const value = event.target.value;
  this.tipoIdSeleccionado = value === 'null' ? null : Number(value);
  this.filtrarPorTipo();
}

  cargarTipos(): void {
    this.tipoService.getAll().subscribe({
      next: (data) => {
        this.tiposHabitacion = data;
        this.cargarHabitaciones();
      },
      error: (err) => {
        console.error('Error cargando tipos:', err);
        this.error = 'Error al cargar tipos de habitación';
        this.cargando = false;
      }
    });
  }

  cargarHabitaciones(): void {
    this.cargando = true;
    this.habitacionService.getAll(this.tipoIdSeleccionado || undefined).subscribe({
      next: (data) => {
        this.habitaciones = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando habitaciones:', err);
        this.error = 'Error al cargar habitaciones';
        this.cargando = false;
      }
    });
  }

  filtrarPorTipo(): void {
    this.cargarHabitaciones();
  }

  limpiarFiltro(): void {
    this.tipoIdSeleccionado = null;
    this.cargarHabitaciones();
  }

  crearHabitacion(): void {
    this.router.navigate(['/habitaciones/admin/nuevo']);
  }

  editarHabitacion(id: number): void {
    this.router.navigate(['/habitaciones/admin/editar', id]);
  }

  eliminarHabitacion(id: number): void {
    if (confirm('¿Eliminar esta habitación?')) {
      this.habitacionService.delete(id).subscribe({
        next: () => {
          this.okMessage = 'Habitación eliminada correctamente';
          this.cargarHabitaciones();
          setTimeout(() => this.okMessage = '', 3000);
        },
        error: (err) => {
          console.error('Error eliminando:', err);
          this.errMessage = 'Error al eliminar la habitación';
          setTimeout(() => this.errMessage = '', 3000);
        }
      });
    }
  }

  getEstadoClass(estado: string | undefined): string {
  if (!estado) return 'bg-slate-800 text-slate-300 border-slate-700';
  switch(estado) {
    case 'DISPONIBLE': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'OCUPADA': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    case 'MANTENIMIENTO': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    default: return 'bg-slate-800 text-slate-300 border-slate-700';
  }
}
}