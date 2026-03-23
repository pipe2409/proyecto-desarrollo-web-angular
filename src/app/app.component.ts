import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root', // 👈 también cambia esto
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { // 👈 este era el problema

  private lastScrollY: number = 0;

  ngOnInit(): void {
    this.lastScrollY = window.scrollY;
    this.handleNavbarVisibility();
  }

  @HostListener('window:scroll')
  handleNavbarVisibility(): void {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const currentScrollY: number = window.scrollY;

    if (currentScrollY > 80) {
      navbar.classList.add('show-navbar', 'scrolled');
    } else {
      navbar.classList.remove('show-navbar', 'scrolled');
    }

    this.lastScrollY = currentScrollY;
  }
}