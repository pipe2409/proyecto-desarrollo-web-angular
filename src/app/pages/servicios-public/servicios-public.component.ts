import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Servicio } from '../../modelo/servicio';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-servicios-public',
  templateUrl: './servicios-public.component.html',
  styleUrls: ['./servicios-public.component.scss']
})
export class ServiciosPublicComponent implements OnInit, AfterViewInit {
  servicios: Servicio[] = [];
  cargando = true;
  error = '';

  @ViewChild('servicesCarousel') carouselRef!: ElementRef<HTMLDivElement>;

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.configurarCarrusel();
    }, 500);
  }

  cargarServicios(): void {
    this.cargando = true;
    this.serviciosService.getAll().subscribe({
      next: (data) => {
        this.servicios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando servicios:', err);
        this.error = 'Error al cargar los servicios';
        this.cargando = false;
      }
    });
  }

  configurarCarrusel(): void {
    const carousel = document.querySelector('.services-carousel') as HTMLElement;
    if (carousel) {
      carousel.style.scrollBehavior = 'smooth';
    }
  }

  scrollCarousel(direction: 'left' | 'right'): void {
    if (!this.carouselRef) return;
    const carousel = this.carouselRef.nativeElement;
    const scrollAmount = carousel.offsetWidth * 0.8;
    
    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
