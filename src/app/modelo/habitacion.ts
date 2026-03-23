import {TipoHabitacion} from './tipo-habitacion';

export class Habitacion {

  id?: number;
  codigo?: string;
  piso?: number;
  estado?: string;
  tipoHabitacion?: TipoHabitacion;
  notas?: string;

  constructor(
    id?: number,
    codigo?: string,
    piso?: number,
    estado?: string,
    tipoHabitacion?: TipoHabitacion,
    notas?: string
  ) {
    this.id = id;
    this.codigo = codigo;
    this.piso = piso;
    this.estado = estado;
    this.tipoHabitacion = tipoHabitacion;
    this.notas = notas;
  }

}
