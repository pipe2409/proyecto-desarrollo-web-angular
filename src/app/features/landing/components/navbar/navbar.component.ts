import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isScrolled = false;
  showNavbar = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  irALogin(): void {
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }

  irAMiPerfil(): void {
    this.router.navigate(['/mi-perfil']);
    this.closeMobileMenu();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }

  get nombreUsuario(): string {
    return localStorage.getItem('nombre') || 'Mi cuenta';
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollY = window.scrollY;
    this.showNavbar = scrollY > 50;
    this.isScrolled = scrollY > 100;
  }
}