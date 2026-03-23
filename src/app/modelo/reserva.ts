import { CuentaHabitacion } from './cuenta-habitacion';
import { Huesped } from './huesped';
import { Habitacion } from './habitacion';
import { Operador } from './operador';
export class Reserva {

  id?: number;
  fechaInicio?: Date;
  fechaFin?: Date;
  cantidadPersonas?: number;
  estado?: string;
  huesped?: Huesped;
  habitacion?: Habitacion;
  operador?: Operador;
  cuentaHabitacion?: CuentaHabitacion;

  constructor(
    id?: number,
    fechaInicio?: Date,
    fechaFin?: Date,
    cantidadPersonas?: number,
    estado?: string,
    huesped?: Huesped,
    habitacion?: Habitacion,
    operador?: Operador,
    cuentaHabitacion?: CuentaHabitacion
  ) {
    this.id = id;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.cantidadPersonas = cantidadPersonas;
    this.estado = estado;
    this.huesped = huesped;
    this.habitacion = habitacion;
    this.operador = operador;
    this.cuentaHabitacion = cuentaHabitacion;
  }

}