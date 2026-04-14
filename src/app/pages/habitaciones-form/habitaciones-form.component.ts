import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habitacion, TipoHabitacion } from '../../modelo/habitacion';
import { HabitacionService } from '../../services/habitacion.service';
import { TipoHabitacionService } from '../../services/tipo-habitacion.service';

@Component({
  selector: 'app-habitaciones-form',
  templateUrl: './habitaciones-form.component.html',
  styleUrls: ['./habitaciones-form.component.scss']
})
export class HabitacionesFormComponent implements OnInit {
  modo: 'crear' | 'editar' = 'crear';
  habitacionId: number | null = null;
  tiposHabitacion: TipoHabitacion[] = [];
  cargando = true;
  error = '';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private habitacionService: HabitacionService,
    private tipoService: TipoHabitacionService
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      piso: ['', [Validators.required, Validators.min(0)]],
      estado: ['DISPONIBLE', Validators.required],
      tipoHabitacionId: ['', Validators.required],
      notas: ['']
    });
  }

  ngOnInit(): void {
    this.cargarTipos();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.modo = 'editar';
      this.habitacionId = +id;
      this.cargarHabitacion(this.habitacionId);
    } else {
      this.cargando = false;
    }
  }

  cargarTipos(): void {
    this.tipoService.getAll().subscribe({
      next: (data: TipoHabitacion[]) => {
        this.tiposHabitacion = data;
      },
      error: (err) => {
        console.error('Error cargando tipos:', err);
        this.error = 'Error al cargar tipos de habitación';
      }
    });
  }

  cargarHabitacion(id: number): void {
    this.cargando = true;
    this.habitacionService.getById(id).subscribe({
      next: (data: Habitacion) => {
        this.form.patchValue({
          codigo: data.codigo,
          piso: data.piso,
          estado: data.estado,
          tipoHabitacionId: data.tipoHabitacion?.id,
          notas: data.notas
        });
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando habitación:', err);
        this.error = 'Error al cargar la habitación';
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const habitacionData = {
      codigo: this.form.get('codigo')?.value,
      piso: this.form.get('piso')?.value,
      estado: this.form.get('estado')?.value,
      tipoHabitacionId: this.form.get('tipoHabitacionId')?.value,
      notas: this.form.get('notas')?.value
    };

    if (this.modo === 'crear') {
      this.habitacionService.create(habitacionData).subscribe({
        next: () => {
          this.router.navigate(['/habitaciones/admin']);
        },
        error: (err) => {
          console.error('Error creando:', err);
          this.error = 'Error al crear la habitación';
        }
      });
    } else {
      this.habitacionService.update(this.habitacionId!, habitacionData).subscribe({
        next: () => {
          this.router.navigate(['/habitaciones/admin']);
        },
        error: (err) => {
          console.error('Error actualizando:', err);
          this.error = 'Error al actualizar la habitación';
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/habitaciones/admin']);
  }
}