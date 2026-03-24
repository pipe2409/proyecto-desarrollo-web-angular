import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isMobileMenuOpen = false;
  isScrolled = false;
  showNavbar = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollY = window.scrollY;

    // Mostrar navbar después de un pequeño scroll
    this.showNavbar = scrollY > 50;

    // Cambiar estilo cuando baja más
    this.isScrolled = scrollY > 100;
  }
}