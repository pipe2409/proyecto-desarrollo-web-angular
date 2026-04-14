import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from '../../../../modelo/servicio';
import { ServiciosService } from '../../../../services/servicios.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  allServices: Servicio[] = [];     // Todos los servicios del backend
  services: Servicio[] = [];        // Solo 5 servicios aleatorios para mostrar
  activeService: Servicio | null = null;
  cargando: boolean = true;
  error: string = '';

  constructor(
    private serviciosService: ServiciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    this.cargando = true;
    this.serviciosService.getAll().subscribe({
      next: (data) => {
        this.allServices = data;
        // Seleccionar 5 servicios aleatorios
        this.services = this.obtenerServiciosAleatorios(data, 5);
        if (this.services.length > 0) {
          this.activeService = this.services[0];
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando servicios:', err);
        this.error = 'No se pudieron cargar los servicios';
        this.cargando = false;
      }
    });
  }

  // Función para obtener N servicios aleatorios
  obtenerServiciosAleatorios(servicios: Servicio[], cantidad: number): Servicio[] {
    if (!servicios || servicios.length === 0) return [];
    
    // Si hay menos servicios que la cantidad solicitada, devolver todos
    if (servicios.length <= cantidad) return [...servicios];
    
    // Algoritmo de Fisher-Yates para seleccionar aleatorios sin repetir
    const shuffled = [...servicios];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, cantidad);
  }

  setActiveService(service: Servicio): void {
    this.activeService = service;
  }

  isActive(service: Servicio): boolean {
    return this.activeService?.id === service.id;
  }

  verTodosLosServicios(): void {
    this.router.navigate(['/servicios']);
  }
}