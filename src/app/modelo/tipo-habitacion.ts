export class TipoHabitacion {

  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  imagenUrl?: string;
  capacidad?: number;
  camas?: string;
  amenities?: string;
  disponible?: boolean;

  constructor(
    id?: number,
    nombre?: string,
    descripcion?: string,
    precio?: number,
    imagenUrl?: string,
    capacidad?: number,
    camas?: string,
    amenities?: string,
    disponible?: boolean
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagenUrl = imagenUrl;
    this.capacidad = capacidad;
    this.camas = camas;
    this.amenities = amenities;
    this.disponible = disponible;
  }

}
