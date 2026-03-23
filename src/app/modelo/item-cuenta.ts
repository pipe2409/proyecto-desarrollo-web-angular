import { CuentaHabitacion } from './cuenta-habitacion';
import { Servicio } from './servicio';

export class ItemCuenta {

  id?: number;
  cantidad?: number;
  subtotal?: number;
  cuentaHabitacion?: CuentaHabitacion;
  servicio?: Servicio;

  constructor(
    id?: number,
    cantidad?: number,
    subtotal?: number,
    cuentaHabitacion?: CuentaHabitacion,
    servicio?: Servicio
  ) {
    this.id = id;
    this.cantidad = cantidad;
    this.subtotal = subtotal;
    this.cuentaHabitacion = cuentaHabitacion;
    this.servicio = servicio;
  }

}