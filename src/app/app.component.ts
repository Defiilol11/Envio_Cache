import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent {
  mobileOpen = false;

  constructor(private notify: NotificationService) {}

  get toast() {
    return this.notify.current();
  }

  toggleMobileNav() {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobileNav() {
    this.mobileOpen = false;
  }

  @HostListener('window:resize')
  onResize() {
    // Si pasa a >= md (768px), cerramos el menú móvil por si estaba abierto
    if (window.innerWidth >= 768 && this.mobileOpen) {
      this.mobileOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMobileNav();
  }
}
