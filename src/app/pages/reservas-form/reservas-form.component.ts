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
        this.form.patchValue({
          fechaInicio:      this.formatearFecha(data.fechaInicio),
          fechaFin:         this.formatearFecha(data.fechaFin),
          cantidadPersonas: data.cantidadPersonas,
          estado:           data.estado,
          habitacionId:     data.habitacion?.id,
        });
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
  private formatearFecha(fecha?: Date): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toISOString().split('T')[0];
  }

  guardar(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const reservaData = {
      fechaInicio:      this.form.get('fechaInicio')?.value,
      fechaFin:         this.form.get('fechaFin')?.value,
      cantidadPersonas: this.form.get('cantidadPersonas')?.value,
      estado:           this.form.get('estado')?.value,
      habitacion:       { id: this.form.get('habitacionId')?.value },
    };

    if (this.modo === 'crear') {
      this.reservaService.create(reservaData).subscribe({
        next: () => {
          this.router.navigate(['/reservas/admin']);
        },
        error: (err) => {
          console.error('Error creando:', err);
          this.error = 'Error al crear la reserva';
        }
      });
    } else {
      this.reservaService.update(this.reservaId!, reservaData).subscribe({
        next: () => {
          this.router.navigate(['/reservas/admin']);
        },
        error: (err) => {
          console.error('Error actualizando:', err);
          this.error = 'Error al actualizar la reserva';
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/reservas/admin']);
  }
}