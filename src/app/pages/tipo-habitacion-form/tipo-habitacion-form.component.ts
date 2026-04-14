import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoHabitacion } from '../../modelo/tipo-habitacion';
import { TipoHabitacionService } from '../../services/tipo-habitacion.service';

@Component({
  selector: 'app-tipo-habitacion-form',
  templateUrl: './tipo-habitacion-form.component.html',
  styleUrls: ['./tipo-habitacion-form.component.scss']
})
export class TipoHabitacionFormComponent implements OnInit {
  form!: FormGroup;
  editing = false;
  roomId!: number;

  constructor(
    private fb: FormBuilder,
    private tipoHabitacionService: TipoHabitacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:        ['', Validators.required],
      description: ['', Validators.required],
      price:       [0, [Validators.required, Validators.min(0)]],
      imageUrl:    [''],
      capacity:    [1, [Validators.required, Validators.min(1)]],
      beds:        ['', Validators.required],
      amenities:   ['', Validators.required],
      available:   [true]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editing = true;
      this.roomId = Number(id);

      // 👇 getById ahora retorna Observable
      this.tipoHabitacionService.getById(this.roomId).subscribe({
        next: (room) => {
          this.form.patchValue({
            ...room,
            amenities: room.amenities.join(', ') // 👈 array → string para el input
          });
        },
        error: (err) => console.error('Error cargando tipo de habitación:', err)
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const room: TipoHabitacion = {
      id:          this.editing ? this.roomId : 0,
      name:        value.name,
      description: value.description,
      price:       Number(value.price),
      imageUrl:    value.imageUrl,
      capacity:    Number(value.capacity),
      beds:        value.beds,
      amenities:   value.amenities
                    .split(',')
                    .map((item: string) => item.trim())
                    .filter((item: string) => item.length > 0),
      available:   value.available
    };

    if (this.editing) {
      // 👇 update ahora retorna Observable
      this.tipoHabitacionService.update(this.roomId, room).subscribe({
        next: () => this.router.navigate(['/tipos-habitacion']),
        error: (err) => console.error('Error actualizando:', err)
      });
    } else {
      // 👇 create ahora retorna Observable
      this.tipoHabitacionService.create(room).subscribe({
        next: () => this.router.navigate(['/tipos-habitacion']),
        error: (err) => console.error('Error creando:', err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/tipos-habitacion']);
  }
}