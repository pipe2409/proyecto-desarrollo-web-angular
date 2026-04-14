import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Servicio } from '../../modelo/servicio';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicios-form.component.html',
})
export class ServicioFormComponent implements OnInit {
  editing = false;
  servicioId: number | null = null;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    subtitle: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    features: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviciosService: ServiciosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editing = true;
      this.servicioId = +id;

      // 👇 ahora usamos subscribe porque getById retorna Observable
      this.serviciosService.getById(+id).subscribe({
        next: (servicio) => {
          this.form.setValue({
            title: servicio.title,
            subtitle: servicio.subtitle,
            description: servicio.description,
            image: servicio.image,
            features: servicio.features.join(', '),
          });
        },
        error: (err) => console.error('Error cargando servicio:', err)
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const valor = this.form.value;

    const servicio: Servicio = {
      id: this.servicioId ?? 0, // 👈 el backend asigna el id real, 0 es placeholder
      title: valor.title ?? '',
      subtitle: valor.subtitle ?? '',
      description: valor.description ?? '',
      image: valor.image ?? '',
      features: (valor.features ?? '')
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0),
    };

    if (this.editing && this.servicioId !== null) {
      // 👇 update ahora retorna Observable, hay que suscribirse
      this.serviciosService.update(this.servicioId, servicio).subscribe({
        next: () => this.router.navigate(['/servicios/admin']),
        error: (err) => console.error('Error actualizando:', err)
      });
    } else {
      // 👇 igual con create
      this.serviciosService.create(servicio).subscribe({
        next: () => this.router.navigate(['/servicios/admin']),
        error: (err) => console.error('Error creando:', err)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/servicios/admin']);
  }
}