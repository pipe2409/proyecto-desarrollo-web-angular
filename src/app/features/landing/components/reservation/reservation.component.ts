import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservationForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      fechaEntrada: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      personas: ['2', Validators.required],
      habitacion: ['estandar', Validators.required]
    });
  }

  get f() {
    return this.reservationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      return;
    }

    console.log('Solicitud de reserva:', this.reservationForm.value);
    alert('Tu solicitud de reserva fue enviada correctamente.');

    this.reservationForm.reset({
      personas: '2',
      habitacion: 'estandar'
    });

    this.submitted = false;
  }
}