import { Reserva } from './reserva';
import { ItemCuenta } from './item-cuenta';
export class CuentaHabitacion {

  id?: number;
  total?: number;
  reserva?: Reserva;
  items?: ItemCuenta[];

  constructor(
    id?: number,
    total?: number,
    reserva?: Reserva,
    items?: ItemCuenta[]
  ) {
    this.id = id;
    this.total = total;
    this.reserva = reserva;
    this.items = items;
  }

}