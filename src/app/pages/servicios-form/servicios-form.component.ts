import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Servicio } from '../../modelo/servicio';
import { SERVICES_DATA } from '../../features/landing/data/servicio.data';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicios-form.component.html',
})
export class ServicioFormComponent implements OnInit {
  editing = false;
  servicioId: number | null = null;

  form = new FormGroup({
    title:       new FormControl('', Validators.required),
    subtitle:    new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image:       new FormControl('', Validators.required),
    features:    new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.servicioId = +id;

      const servicio = SERVICES_DATA.find(s => s.id === +id);
      if (servicio) {
        this.form.setValue({
          title:       servicio.title,
          subtitle:    servicio.subtitle,
          description: servicio.description,
          image:       servicio.image,
          features:    servicio.features.join(', '),
        });
      }
    }
  }

  save() {
    if (this.form.invalid) return;

    const valor = this.form.value;
    const servicio: Servicio = {
      id:          this.servicioId ?? Date.now(),
      title:       valor.title!,
      subtitle:    valor.subtitle!,
      description: valor.description!,
      image:       valor.image!,
      features:    valor.features!.split(',').map(f => f.trim()),
    };

    console.log('Servicio guardado:', servicio);
    this.router.navigate(['/servicios']);
  }

  cancel() {
  this.router.navigate(['/servicios/admin']);
}
}