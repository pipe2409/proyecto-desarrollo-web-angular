import { Component } from '@angular/core';
import { Servicio } from '../../../../modelo/servicio';
import { SERVICES_DATA } from '../../data/servicio.data';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services: Servicio[] = SERVICES_DATA;
  activeService: Servicio = this.services[0];

  setActiveService(service: Servicio): void {
    this.activeService = service;
  }

  isActive(service: Servicio): boolean {
    return this.activeService.id === service.id;
  }
}