import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reserva } from '../../modelo/reserva';
import { Habitacion } from '../../modelo/habitacion';
import { ReservaService } from '../../services/reserva.service';
import { HabitacionService } from '../../services/habitacion.service';

@Component({
  selector: 'app-reservas-form',
  templateUrl: './reservas-form.component.html',
  styleUrls: ['./reservas-form.component.scss']
})
export class ReservasFormComponent implements OnInit {
  modo: 'crear' | 'editar' = 'crear';
  reservaId: number | null = null;
  huespedId: number | null = null; // Guardamos el ID del huésped para no perderlo al editar
  habitaciones: Habitacion[] = [];
  cargando = true;
  error = '';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private habitacionService: HabitacionService
  ) {
    this.form = this.fb.group({
      fechaInicio:      ['', Validators.required],
      fechaFin:         ['', Validators.required],
      cantidadPersonas: [1, [Validators.required, Validators.min(1)]],
      estado:           ['PENDIENTE', Validators.required],
      habitacionId:     ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarHabitaciones();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modo = 'editar';
      this.reservaId = +id;
      this.cargarReserva(this.reservaId);
    } else {
      this.cargando = false;
    }
  }

  cargarHabitaciones(): void {
    this.habitacionService.getAll().subscribe({
      next: (data: Habitacion[]) => {
        this.habitaciones = data;
      },
      error: (err) => {
        console.error('Error cargando habitaciones:', err);
        this.error = 'Error al cargar las habitaciones';
      }
    });
  }

  cargarReserva(id: number): void {
    this.cargando = true;
    this.reservaService.getById(id).subscribe({
      next: (data: Reserva) => {
        try {
          this.huespedId = data?.huesped?.id || null;
          const habitacionId = data?.habitacion?.id || '';
          
          this.form.patchValue({
            fechaInicio:      this.formatearFecha(data?.fechaInicio),
            fechaFin:         this.formatearFecha(data?.fechaFin),
            cantidadPersonas: data?.cantidadPersonas || 1,
            estado:           data?.estado || 'PENDIENTE',
            habitacionId:     habitacionId,
          });
        } catch (e) {
          console.error('Error procesando datos de reserva:', e);
          this.error = 'Error al procesar los datos de la reserva';
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando reserva:', err);
        this.error = 'Error al cargar la reserva';
        this.cargando = false;
      }
    });
  }

  // El input type="date" necesita formato yyyy-MM-dd
  private formatearFecha(fecha?: Date | string): string {
    if (!fecha) return '';
    try {
      const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
      if (isNaN(d.getTime())) return '';
      return d.toISOString().split('T')[0];
    } catch (e) {
      console.warn('Error formateando fecha:', e);
      return '';
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    try {
      const habitacionId = this.form.get('habitacionId')?.value;
      const nuevoEstado = this.form.get('estado')?.value;
      const fechaInicioStr = this.form.get('fechaInicio')?.value;
      const fechaFinStr = this.form.get('fechaFin')?.value;

      // Asegurar que las fechas tengan formato LocalDateTime (YYYY-MM-DDTHH:mm:ss)
      const fechaInicio = fechaInicioStr?.includes('T') ? fechaInicioStr : `${fechaInicioStr}T14:00:00`;
      const fechaFin = fechaFinStr?.includes('T') ? fechaFinStr : `${fechaFinStr}T12:00:00`;

      const reservaData = {
        fechaInicio,
        fechaFin,
        cantidadPersonas: this.form.get('cantidadPersonas')?.value,
        estado: nuevoEstado,
        habitacionId,
        huespedId: this.huespedId
      };

      if (this.modo === 'crear') {
        this.reservaService.create(reservaData).subscribe({
          next: () => {
            this.router.navigate(['/reservas/admin']);
          },
          error: (err) => {
            console.error('Error creando:', err);
            this.error = 'Error al crear la reserva: ' + (err?.error?.err || err?.statusText || 'Error desconocido');
          }
        });
      } else {
        this.reservaService.update(this.reservaId!, reservaData).subscribe({
          next: () => {
            // Si la reserva se confirmó, actualizar el estado de la habitación
            if (nuevoEstado === 'CONFIRMADA' || nuevoEstado === 'OCUPADA') {
              this.actualizarEstatusHabitacion(habitacionId, 'OCUPADA');
            }
            this.router.navigate(['/reservas/admin']);
          },
          error: (err) => {
            console.error('Error actualizando:', err);
            console.error('Respuesta:', err?.error);
            this.error = 'Error al actualizar la reserva: ' + (err?.error?.message || err?.statusText || 'Error desconocido');
          }
        });
      }
    } catch (e) {
      console.error('Error en método guardar:', e);
      this.error = 'Error inesperado al guardar la reserva';
    }
  }

  actualizarEstatusHabitacion(habitacionId: number, nuevoEstado: string): void {
    // Obtener los datos actuales de la habitación
    this.habitacionService.getById(habitacionId).subscribe({
      next: (habitacion: Habitacion) => {
        const datosActualizacion = {
          codigo: habitacion.codigo,
          piso: habitacion.piso,
          estado: nuevoEstado,
          tipoHabitacionId: habitacion.tipoHabitacion?.id,
          notas: habitacion.notas
        };
        
        this.habitacionService.update(habitacionId, datosActualizacion).subscribe({
          next: () => {
            console.log('Estado de habitación actualizado a:', nuevoEstado);
          },
          error: (err) => {
            console.error('Error actualizando estado de habitación:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error obteniendo habitación:', err);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/reservas/admin']);
  }
}