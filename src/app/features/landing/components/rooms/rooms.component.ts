import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TipoHabitacion } from '../../../../modelo/tipo-habitacion';
import { TipoHabitacionService } from '../../../../services/tipo-habitacion.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements AfterViewInit {
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;

  rooms: TipoHabitacion[] = [];
  activeIndex: number = 1;
  cargando: boolean = true;
  error: string = '';

  constructor(private tipoHabitacionService: TipoHabitacionService) {}

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    this.tipoHabitacionService.getAll().subscribe({
      next: (data) => {
        this.rooms = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando tipos de habitación:', err);
        this.error = 'No se pudieron cargar las habitaciones';
        this.cargando = false;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToActiveSlide();
    });
  }

  scrollCarousel(direction: 'left' | 'right'): void {
    if (!this.carouselRef) return;

    const carousel = this.carouselRef.nativeElement;
    const slideWidth = carousel.offsetWidth * 0.75;

    if (direction === 'left') {
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
      carousel.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    } else {
      this.activeIndex = Math.min(this.activeIndex + 1, this.rooms.length - 1);
      carousel.scrollBy({ left: slideWidth, behavior: 'smooth' });
    }
  }

  private scrollToActiveSlide(): void {
    if (!this.carouselRef) return;

    const carousel = this.carouselRef.nativeElement;
    const slides = carousel.querySelectorAll('.habitacion-slide');

    if (!slides.length || !slides[this.activeIndex]) return;

    const activeSlide = slides[this.activeIndex] as HTMLElement;
    const leftOffset =
      activeSlide.offsetLeft - (carousel.offsetWidth - activeSlide.offsetWidth) / 2;

    carousel.scrollTo({
      left: leftOffset,
      behavior: 'smooth'
    });
  }
}