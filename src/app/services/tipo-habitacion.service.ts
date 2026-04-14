import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoHabitacion } from '../modelo/tipo-habitacion';
import { environment } from '../../environments/environment';
//import { ROOMS_DATA } from '../features/landing/data/tipos-habitacion.data';

@Injectable({
  providedIn: 'root'
})

export class TipoHabitacionService {

  private apiUrl = `${environment.apiUrl}/api/tipos-habitacion`;

  constructor(private http: HttpClient) {}

  private mapear(item: any): TipoHabitacion {
    return {
      id:          item.id,
      name:        item.nombre,
      description: item.descripcion,
      price:       item.precio,
      imageUrl:    item.imagenUrl,
      capacity:    item.capacidad,
      beds:        item.camas,
      amenities:   item.amenities
                    ? item.amenities.split(',').map((a: string) => a.trim())
                    : [],
      available:   item.disponible !== undefined ? item.disponible : true
    };
  }

  getAll(): Observable<TipoHabitacion[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(items => items.map(item => this.mapear(item)))
    );
  }

  getById(id: number): Observable<TipoHabitacion> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(item => this.mapear(item))
    );
  }

  create(room: TipoHabitacion): Observable<TipoHabitacion> {
    return this.http.post<any>(this.apiUrl, this.desmapear(room)).pipe(
      map(item => this.mapear(item))
    );
  }

  update(id: number, room: TipoHabitacion): Observable<TipoHabitacion> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, this.desmapear(room)).pipe(
      map(item => this.mapear(item))
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private desmapear(room: TipoHabitacion): any {
    return {
      nombre:      room.name,
      descripcion: room.description,
      precio:      room.price,
      imagenUrl:   room.imageUrl,
      capacidad:   room.capacity,
      camas:       room.beds,
      disponible:  room.available !== undefined ? room.available : true,
      amenities:   Array.isArray(room.amenities)
                    ? room.amenities.join(', ')
                    : room.amenities
    };
  }

  /*
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
  }*/
}