import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/services/cuenta.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Reserva } from 'src/app/modelo/reserva';
import { CuentaHabitacion } from 'src/app/modelo/cuenta-habitacion';
import { ItemCuenta } from 'src/app/modelo/item-cuenta';

@Component({
  selector: 'app-servicios-cuenta',
  templateUrl: './servicios-cuenta.component.html',
  styleUrls: ['./servicios-cuenta.component.scss']
})
export class ServiciosCuentaComponent implements OnInit {

  // Buscador
  numeroHabitacion: string = '';
  cargandoHuesped: boolean = false;
  
  // Datos de la reserva y cuenta
  reservaSeleccionada: Reserva | null = null;
  cuentaSeleccionada: CuentaHabitacion | null = null;
  
  // Servicios disponibles
  serviciosDisponibles: any[] = [];
  cargandoServicios: boolean = false;
  
  // Items de la cuenta
  itemsCuenta: ItemCuenta[] = [];
  totalCuenta: number = 0;
  
  // Estados
  pagando: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private cuentaService: CuentaService,
    private serviciosService: ServiciosService
  ) {}

  ngOnInit(): void {
    this.cargarServiciosDisponibles();
  }

  // Volver al panel de administrador
  volver(): void {
    this.router.navigate(['/menu-admin']);
  }

  // Cargar todos los servicios disponibles
  cargarServiciosDisponibles(): void {
    this.cargandoServicios = true;
    this.serviciosService.getAll().subscribe({
      next: (servicios) => {
        this.serviciosDisponibles = servicios;
        this.cargandoServicios = false;
      },
      error: (err) => {
        console.error('Error cargando servicios:', err);
        this.errorMessage = 'No se pudieron cargar los servicios';
        this.cargandoServicios = false;
      }
    });
  }

  // Buscar reserva por número de habitación
  buscarPorHabitacion(): void {
    if (!this.numeroHabitacion.trim()) {
      this.errorMessage = 'Ingrese un número de habitación';
      return;
    }

    this.cargandoHuesped = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.reservaSeleccionada = null;
    this.cuentaSeleccionada = null;
    this.itemsCuenta = [];
    this.totalCuenta = 0;

    this.cuentaService.getReservaPorHabitacion(this.numeroHabitacion).subscribe({
      next: (response) => {
        this.reservaSeleccionada = response.reserva;
        this.cuentaSeleccionada = response.cuenta;
        this.cargandoHuesped = false;
        
        // Cargar los items de la cuenta
        if (this.cuentaSeleccionada?.id) {
          this.cargarItemsCuenta(this.cuentaSeleccionada.id);
        }
      },
      error: (err) => {
        console.error('Error buscando habitación:', err);
        this.errorMessage = err.error?.error || 'No se encontró una reserva activa para esta habitación';
        this.cargandoHuesped = false;
      }
    });
  }

  // Cargar items de la cuenta
// Cargar items de la cuenta
cargarItemsCuenta(cuentaId: number): void {
  this.cuentaService.getItemsCuenta(cuentaId).subscribe({
    next: (items) => {
      // Mapear los items para convertir 'nombre' a 'title'
      this.itemsCuenta = items.map((item: any) => ({
        id: item.id,
        cantidad: item.cantidad,
        subtotal: item.subtotal,
        servicio: {
          id: item.servicio?.id,
          title: item.servicio?.nombre,  // ← Convertir nombre a title
          nombre: item.servicio?.nombre,
          subtitle: item.servicio?.descripcion,
          description: item.servicio?.descripcion,
          image: item.servicio?.imagenUrl,
          price: item.servicio?.precio
        } as any,
        cuentaHabitacion: item.cuentaHabitacion
      }));
      this.calcularTotal();
    },
    error: (err) => {
      console.error('Error cargando items:', err);
      this.errorMessage = 'No se pudieron cargar los items de la cuenta';
    }
  });
}
  // Agregar servicio a la cuenta
  agregarServicio(servicio: any): void {
    if (!this.cuentaSeleccionada?.id) {
      this.errorMessage = 'Primero debe buscar una habitación';
      return;
    }

    this.cuentaService.agregarServicio(this.cuentaSeleccionada.id, servicio.id, 1).subscribe({
      next: (response) => {
        this.successMessage = `"${servicio.title}" agregado a la cuenta`;
        setTimeout(() => this.successMessage = '', 3000);
        
        // Recargar items
        if (this.cuentaSeleccionada?.id) {
          this.cargarItemsCuenta(this.cuentaSeleccionada.id);
        }
      },
      error: (err) => {
        console.error('Error agregando servicio:', err);
        this.errorMessage = err.error?.error || 'No se pudo agregar el servicio';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  // Cambiar cantidad de un item
  cambiarCantidad(item: ItemCuenta, delta: number): void {
    const nuevaCantidad = (item.cantidad || 0) + delta;
    if (nuevaCantidad <= 0) {
      this.eliminarItem(item);
      return;
    }

    // Por simplicidad, eliminamos y volvemos a agregar con la nueva cantidad
    // En un sistema real, tendrías un endpoint para actualizar cantidad
    if (!this.cuentaSeleccionada?.id) return;
    
    // Agregar el servicio con la diferencia
    const diferencia = delta;
    const servicio = this.serviciosDisponibles.find(s => s.id === item.servicio?.id);
    
    if (servicio) {
      this.cuentaService.agregarServicio(this.cuentaSeleccionada.id, servicio.id, diferencia).subscribe({
        next: () => {
          if (this.cuentaSeleccionada?.id) {
            this.cargarItemsCuenta(this.cuentaSeleccionada.id);
          }
        },
        error: (err) => {
          console.error('Error actualizando cantidad:', err);
          this.errorMessage = 'No se pudo actualizar la cantidad';
        }
      });
    }
  }

  // Eliminar item de la cuenta
  eliminarItem(item: ItemCuenta): void {
    if (!item.id) return;

    this.cuentaService.eliminarItem(item.id).subscribe({
      next: () => {
        if (this.cuentaSeleccionada?.id) {
          this.cargarItemsCuenta(this.cuentaSeleccionada.id);
        }
        this.successMessage = 'Item eliminado';
        setTimeout(() => this.successMessage = '', 2000);
      },
      error: (err) => {
        console.error('Error eliminando item:', err);
        this.errorMessage = 'No se pudo eliminar el item';
      }
    });
  }

  // Pagar todo
  pagarTodo(): void {
    if (!this.cuentaSeleccionada?.id || this.itemsCuenta.length === 0) {
      this.errorMessage = 'No hay servicios para pagar';
      return;
    }

    if (!confirm(`¿Confirmar pago de $${this.totalCuenta.toLocaleString()}?`)) {
      return;
    }

    this.pagando = true;
    this.cuentaService.pagarCuenta(this.cuentaSeleccionada.id).subscribe({
      next: (response) => {
        this.pagando = false;
        this.successMessage = `Pago de $${response.totalPagado.toLocaleString()} realizado correctamente`;
        this.itemsCuenta = [];
        this.totalCuenta = 0;
        
        // Recargar cuenta actualizada
        if (this.cuentaSeleccionada?.id) {
          this.cargarItemsCuenta(this.cuentaSeleccionada.id);
        }
        
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: (err) => {
        console.error('Error realizando pago:', err);
        this.errorMessage = err.error?.error || 'No se pudo realizar el pago';
        this.pagando = false;
      }
    });
  }

  // Calcular total de la cuenta
  calcularTotal(): void {
    this.totalCuenta = this.itemsCuenta.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  }
}