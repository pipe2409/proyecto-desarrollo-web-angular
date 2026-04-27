import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EstadisticaService, EstadisticasDashboard, ProximaLlegada } from 'src/app/services/estadistica.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {
  operadorNombre: string = '';
  fechaActual: Date = new Date();
  loading: boolean = true;
  error: string = '';
  
  estadisticas: EstadisticasDashboard = {
    totalHabitaciones: 0,
    habitacionesOcupadas: 0,
    porcentajeOcupacion: 0,
    reservasActivas: 0,
    totalHuespedes: 0,
    serviciosActivos: 0,
    totalServicios: 0,
    ingresosMes: 0,
    proximasLlegadas: []
  };

  porcentajeCrecimiento: number = 18;

  constructor(
    private authService: AuthService,
    private estadisticaService: EstadisticaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.rol === 'OPERADOR') {
      this.operadorNombre = currentUser.correo.split('@')[0];
    }
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.loading = true;
    this.estadisticaService.getEstadisticasDashboard().subscribe({
      next: (data) => {
        this.estadisticas = data;
        this.loading = false;
        console.log('Estadísticas cargadas:', data);
      },
      error: (err) => {
        console.error('Error cargando estadísticas:', err);
        this.error = 'No se pudieron cargar las estadísticas';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navegarA(ruta: string): void {
    this.router.navigate([ruta]);
  }

  formatearIngresos(): string {
    return this.estadisticas.ingresosMes.toLocaleString('es-CO');
  }
}