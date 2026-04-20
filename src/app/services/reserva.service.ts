import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../modelo/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  getById(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Métodos existentes — no los tocamos
  listarPorHuesped(huespedId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/huesped/${huespedId}`);
  }

  crearReserva(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, data);
  }

  crearReservaPorTipo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-por-tipo`, data);
  }

  cancelarReserva(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancelar`, {});
  }
}