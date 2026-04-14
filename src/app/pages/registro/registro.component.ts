import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Huesped } from 'src/app/modelo/huesped';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: [''],
      direccion: [''],
      nacionalidad: ['']
    });
  }

  registrarse(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const formValue = this.registroForm.value;

    const huesped = new Huesped(
      undefined,
      formValue.nombre,
      formValue.apellido,
      formValue.correo,
      formValue.contrasena,
      formValue.cedula,
      formValue.telefono,
      formValue.direccion,
      formValue.nacionalidad,
      []
    );

    this.authService.registrar(huesped).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado correctamente';
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        this.error = err?.error?.message || 'No fue posible registrar el usuario';
      }
    });
  }
}