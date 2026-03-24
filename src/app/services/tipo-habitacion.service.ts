import { Injectable } from '@angular/core';
import { TipoHabitacion } from '../modelo/tipo-habitacion';
import { ROOMS_DATA } from '../features/landing/data/tipos-habitacion.data';

@Injectable({
  providedIn: 'root'
})
export class TipoHabitacionService {
  private rooms: TipoHabitacion[] = [...ROOMS_DATA];

  getAll(): TipoHabitacion[] {
    return [...this.rooms];
  }

  getById(id: number): TipoHabitacion | undefined {
    return this.rooms.find(room => room.id === id);
  }

  create(room: TipoHabitacion): void {
    const newId =
      this.rooms.length > 0
        ? Math.max(...this.rooms.map(r => r.id)) + 1
        : 1;

    this.rooms.push({
      ...room,
      id: newId
    });
  }

  update(id: number, updatedRoom: TipoHabitacion): void {
    const index = this.rooms.findIndex(room => room.id === id);
    if (index !== -1) {
      this.rooms[index] = { ...updatedRoom, id };
    }
  }

  delete(id: number): void {
    this.rooms = this.rooms.filter(room => room.id !== id);
  }
}