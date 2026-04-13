import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../modelo/servicio';
import { environment } from '../../environments/environment';
//import { SERVICES_DATA } from '../features/landing/data/servicio.data';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

//private servicios = SERVICES_DATA;

private apiUrl = `${environment.apiUrl}/api/servicios`; // 
constructor(private http: HttpClient) {}

getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
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