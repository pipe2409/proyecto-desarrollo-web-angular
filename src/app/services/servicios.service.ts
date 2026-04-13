import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../modelo/servicio';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
//import { SERVICES_DATA } from '../features/landing/data/servicio.data';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

//private servicios = SERVICES_DATA;

private apiUrl = `${environment.apiUrl}/api/servicios`; // 
constructor(private http: HttpClient) {}

getAll(): Observable<Servicio[]> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(data => data.map(item => ({
      id: item.id,
      title: item.nombre,
      subtitle: item.horario,
      description: item.descripcion,
      image: item.imagenUrl,
      features: [item.precioTipo, `Capacidad: ${item.capacidad}`, `Precio: $${item.precio}`]
    })))
  );
}

   getById(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`);
  }

  create(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, servicio);
  }

  update(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}/${id}`, servicio);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 
  //Codigo servicio usando datos locales
  /*constructor() {}

   
  getAll(): Servicio[] {
    return this.servicios;
  }

  


  getById(id: number): Servicio | undefined {
    return this.servicios.find(s => s.id === id);
  }

  create(servicio: Servicio): void {
    this.servicios.push(servicio);
  }

  update(id: number, servicioActualizado: Servicio): void {
    const index = this.servicios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.servicios[index] = servicioActualizado;
    }
  }

  delete(id: number): void {
    const index = this.servicios.findIndex(s => s.id === id);
    if (index !== -1) {
      this.servicios.splice(index, 1);
    }
  }
  */
}