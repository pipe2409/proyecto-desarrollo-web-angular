import { TipoHabitacion } from '../../../modelo/tipo-habitacion';

export const ROOMS_DATA: TipoHabitacion[] = [
  {
    id: 1,
    name: 'Suite Praia',
    description: 'Una habitación elegante con acabados premium, ambiente cálido y una experiencia pensada para el descanso total.',
    price: 480000,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    capacity: 2,
    beds: '1 cama king',
    amenities: ['Wifi', 'Aire acondicionado', 'Minibar', 'Vista exterior'],
    available: true
  },
  {
    id: 2,
    name: 'Habitación Deluxe',
    description: 'Espacios amplios, diseño contemporáneo y una atmósfera ideal para una estadía cómoda y sofisticada.',
    price: 390000,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    capacity: 2,
    beds: '1 cama queen',
    amenities: ['Wifi', 'TV', 'Escritorio', 'Baño privado'],
    available: true
  },
  {
    id: 3,
    name: 'Habitación Familiar',
    description: 'Perfecta para compartir momentos especiales con más espacio, comodidad y servicios pensados para todos.',
    price: 620000,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    capacity: 4,
    beds: '2 camas dobles',
    amenities: ['Wifi', 'TV', 'Sala auxiliar', 'Baño privado'],
    available: true
  },
  {
    id: 4,
    name: 'Habitación con piscina privada',
    description: 'Perfecta para compartir momentos especiales con más espacio, comodidad y servicios pensados para todos.',
    price: 620000,
    imageUrl: 'https://images.unsplash.com/photo-1670523865335-62e1d0136601?w=600&auto=format&fit=crop&q=60',
    capacity: 4,
    beds: '2 camas dobles',
    amenities: ['Wifi', 'TV', 'Sala auxiliar', 'Baño privado'],
    available: true
  }
];