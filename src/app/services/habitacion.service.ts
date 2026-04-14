import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../modelo/habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private apiUrl = 'http://localhost:8080/api/habitaciones';

  constructor(private http: HttpClient) {}

  getAll(tipoId?: number): Observable<Habitacion[]> {
    const url = tipoId ? `${this.apiUrl}?tipoId=${tipoId}` : this.apiUrl;
    return this.http.get<Habitacion[]>(url);
  }

  getById(id: number): Observable<Habitacion> {
    return this.http.get<Habitacion>(`${this.apiUrl}/${id}`);
  }

  create(habitacion: any): Observable<Habitacion> {
    return this.http.post<Habitacion>(this.apiUrl, habitacion);
  }

  update(id: number, habitacion: any): Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.apiUrl}/${id}`, habitacion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}