import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdenService, Orden, Actualizacion } from '../../services/orden.service';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear.html'
})
export class Crear {
  nombre = '';
  direccion = '';
  correo = '';
  descripcion = '';
  modalOpen = false;

  constructor(private ordenService: OrdenService, private router: Router) {}

  generarId() { return Math.random().toString(36).substring(2,14); }
  generarNumero() { return Math.floor(Math.random() * 1000000); }

  validarCorreo() { return /@gmail\.com$|@outlook\.com$/.test(this.correo); }

  confirmar() {
    this.modalOpen = true;
  }

  crearOrden() {
    this.modalOpen = false;
    if (!this.nombre.match(/^[A-Za-z\s]+$/)) { alert('Nombre inválido'); return; }
    if (!this.direccion) { alert('Dirección obligatoria'); return; }
    if (!this.validarCorreo()) { alert('Correo inválido'); return; }
    if (this.descripcion.length < 40 || this.descripcion.length > 120) { alert('Descripción inválida'); return; }

    const nuevaOrden: Orden = {
      id: this.generarId(),
      numero: this.generarNumero(),
      estado: 'Creado',
      nombre: this.nombre,
      direccion: this.direccion,
      correo: this.correo,
      descripcion: this.descripcion,
      historial: []
    };

    this.ordenService.crearOrden(nuevaOrden);

    // Redirigir a actualizar para ver/confirmar
    this.router.navigate(['/actualizar'], { queryParams: { numero: nuevaOrden.numero } });
  }
}
