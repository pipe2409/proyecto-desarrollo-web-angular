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
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      capacity: [1, [Validators.required, Validators.min(1)]],
      beds: ['', Validators.required],
      amenities: ['', Validators.required],
      available: [true, Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editing = true;
      this.roomId = Number(id);

      const room = this.tipoHabitacionService.getById(this.roomId);

      if (room) {
        this.form.patchValue({
          ...room,
          amenities: room.amenities.join(', ')
        });
      }
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;

    const room: TipoHabitacion = {
      id: this.editing ? this.roomId : 0,
      name: value.name,
      description: value.description,
      price: Number(value.price),
      imageUrl: value.imageUrl,
      capacity: Number(value.capacity),
      beds: value.beds,
      amenities: value.amenities
        .split(',')
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0),
      available: value.available
    };

    if (this.editing) {
      this.tipoHabitacionService.update(this.roomId, room);
    } else {
      this.tipoHabitacionService.create(room);
    }

    this.router.navigate(['/tipos-habitacion']);
  }

  cancel(): void {
    this.router.navigate(['/tipos-habitacion']);
  }
}