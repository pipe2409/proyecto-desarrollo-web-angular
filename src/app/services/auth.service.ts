import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { Huesped } from '../modelo/huesped';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  registrar(huesped: Huesped): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/registro`, huesped);
  }

  login(correo: string, contrasena: string): Observable<Huesped> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { correo, contrasena }).pipe(
      map(resp => this.mapearUsuario(resp)),
      tap(usuario => {
        if (usuario.id != null) {
          localStorage.setItem('huespedId', usuario.id.toString());
        }

        if (usuario.nombre) {
          localStorage.setItem('nombre', usuario.nombre);
        }

        if (usuario.correo) {
          localStorage.setItem('correo', usuario.correo);
        }
      })
    );
  }

  obtenerPorId(id: number): Observable<Huesped> {
    return this.http.get<any>(`${this.apiUrl}/huespedes/${id}`).pipe(
      map(resp => this.mapearUsuario(resp))
    );
  }

  actualizar(id: number, huesped: Huesped): Observable<any> {
    return this.http.put(`${this.apiUrl}/huespedes/${id}`, huesped);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/huespedes/${id}`);
  }

  listar(): Observable<Huesped[]> {
    return this.http.get<any[]>(`${this.apiUrl}/huespedes/admin`).pipe(
      map(lista => lista.map(item => this.mapearUsuario(item)))
    );
  }

  logout(): void {
    localStorage.removeItem('huespedId');
    localStorage.removeItem('nombre');
    localStorage.removeItem('correo');
  }

  getUsuarioId(): number | null {
    const id = localStorage.getItem('huespedId');
    return id ? Number(id) : null;
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('huespedId');
  }

  private mapearUsuario(data: any): Huesped {
    return new Huesped(
      data.huespedId ?? data.id,
      data.nombre,
      data.apellido,
      data.correo,
      data.contrasena,
      data.cedula,
      data.telefono,
      data.direccion,
      data.nacionalidad,
      data.historialReservas || []
    );
  }
}