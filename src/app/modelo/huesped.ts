import { Reserva } from './reserva';

export class Huesped {
  id?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  contrasena?: string;
  cedula?: string;
  telefono?: string;
  direccion?: string;
  nacionalidad?: string;
  historialReservas?: Reserva[];

  constructor(
    id?: number,
    nombre?: string,
    apellido?: string,
    correo?: string,
    contrasena?: string,
    cedula?: string,
    telefono?: string,
    direccion?: string,
    nacionalidad?: string,
    historialReservas?: Reserva[]
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contrasena = contrasena;
    this.cedula = cedula;
    this.telefono = telefono;
    this.direccion = direccion;
    this.nacionalidad = nacionalidad;
    this.historialReservas = historialReservas;
  }
}