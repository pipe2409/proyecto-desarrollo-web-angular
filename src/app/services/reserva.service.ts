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

  listarPorHuesped(huespedId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/huesped/${huespedId}`);
  }

  // 👇 RESERVA POR HABITACIÓN (puedes dejarlo)
  crearReserva(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, data);
  }

  // 👇 NUEVO: RESERVA POR TIPO (ESTE ES EL IMPORTANTE)
  crearReservaPorTipo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-por-tipo`, data);
  }

  cancelarReserva(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancelar`, {});
  }
}