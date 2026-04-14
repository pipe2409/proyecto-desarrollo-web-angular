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
          
          const errorMessage = err.error?.message || err.error?.err || err.message || '';
          const statusCode = err.status || 0;
          
          // Detectar tipo de error específico
          if (statusCode === 409 || statusCode === 400) {
            // Error de conflicto/dependencia - verificar si es por reservas
            const mensaje = errorMessage.toLowerCase();
            
            if (mensaje.includes('pendiente') && mensaje.includes('confirmada')) {
              this.errMessage = 'No se puede eliminar esta habitación porque tiene reservas activas. Existen reservas en estado PENDIENTE o CONFIRMADA. Solo puedes eliminar la habitación si todas sus reservas están CANCELADAS o FINALIZADAS.';
            } else if (mensaje.includes('pendiente')) {
              this.errMessage = 'No se puede eliminar esta habitación porque tiene reservas en estado PENDIENTE. Estas deben ser canceladas o finalizadas primero.';
            } else if (mensaje.includes('confirmada')) {
              this.errMessage = 'No se puede eliminar esta habitación porque tiene reservas en estado CONFIRMADA. Estas deben ser canceladas o finalizadas primero.';
            } else if (mensaje.includes('reserva')) {
              this.errMessage = 'No se puede eliminar esta habitación porque tiene reservas asociadas activas. Por favor, cancela o finaliza todas las reservas primero.';
            } else if (mensaje.includes('ocupada')) {
              this.errMessage = 'No se puede eliminar esta habitación porque está actualmente ocupada. Espera a que se desocupe para intentar de nuevo.';
            } else if (mensaje.includes('mantenimiento')) {
              this.errMessage = 'No se puede eliminar esta habitación porque está en mantenimiento. Cambia su estado primero.';
            } else {
              this.errMessage = 'No se puede eliminar esta habitación porque tiene dependencias activas. Revisa su estado.';
            }
          } else if (statusCode === 404) {
            this.errMessage = 'La habitación no fue encontrada. Recarga la página e intenta de nuevo.';
          } else if (statusCode === 500) {
            this.errMessage = 'Error en el servidor. Intenta de nuevo más tarde.';
          } else {
            this.errMessage = errorMessage || 'Error al eliminar la habitación. Intenta de nuevo.';
          }
          
          setTimeout(() => this.errMessage = '', 6000);
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