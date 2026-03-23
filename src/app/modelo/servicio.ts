export class Servicio {

  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  imagenUrl?: string;
  capacidad?: number;
  precioTipo?: string;
  horario?: string;

  constructor(
    id?: number,
    nombre?: string,
    descripcion?: string,
    precio?: number,
    imagenUrl?: string,
    capacidad?: number,
    precioTipo?: string,
    horario?: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagenUrl = imagenUrl;
    this.capacidad = capacidad;
    this.precioTipo = precioTipo;
    this.horario = horario;
  }

}