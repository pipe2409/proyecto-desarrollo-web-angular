export interface TipoHabitacion {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  capacity: number;
  beds: string;
  amenities: string[];
  available: boolean;
}