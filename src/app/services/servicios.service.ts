import { Injectable } from '@angular/core';
import { Servicio } from '../modelo/servicio';
import { SERVICES_DATA } from '../features/landing/data/servicio.data';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private servicios = SERVICES_DATA;

  constructor() {}

  getAll(): Servicio[] {
    return this.servicios;
  }

  getById(id: number): Servicio | undefined {
    return this.servicios.find(s => s.id === id);
  }

  create(servicio: Servicio): void {
    this.servicios.push(servicio);
  }

  update(id: number, servicioActualizado: Servicio): void {
    const index = this.servicios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.servicios[index] = servicioActualizado;
    }
  }

  delete(id: number): void {
    const index = this.servicios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.servicios.splice(index, 1);
    }
  }
}