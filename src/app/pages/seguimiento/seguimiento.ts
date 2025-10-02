import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenService, Orden, Actualizacion } from '../../services/orden.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seguimiento.html'
})
export class Seguimiento implements OnInit {
  numero: number | null = null;
  orden: Orden | undefined;
  pasos = ['Creado','En proceso','Recogido de bodega','En camino','Entregado'];

  progresoActual: number = 0;
  mostrandoModal: boolean = false;

  constructor(private route: ActivatedRoute, private ordenService: OrdenService, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.numero = +params['numero'];
      this.orden = this.ordenService.buscarOrden(this.numero!);
      if (!this.orden) {
        alert('Orden no encontrada');
        this.router.navigate(['/crear']);
      } else {
        this.mostrarProgresoAnimado();
      }
    });
  }

  esEstadoCompleto(e: string): boolean {
    if (!this.orden) return false;
    return this.orden.estado === e || this.orden.historial?.some(h => h.estado === e);
  }

  get historialOrdenado(): Actualizacion[] {
    return this.orden?.historial.slice().sort((a,b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) || [];
  }

  mostrarProgresoAnimado() {
    if (!this.orden) return;

    this.mostrandoModal = true;
    let index = 1; // saltamos "Creado"

    const avanzarPaso = () => {
      if (!this.orden) return;
      if (index < this.pasos.length) {
        const estado = this.pasos[index];

        // Actualizamos estado y historial
        this.orden.estado = estado;
        const actualizacion: Actualizacion = {
          estado,
          comentario: `Estado cambiado a ${estado}`,
          responsable: 'Sistema',
          fecha: new Date()
        };
        if (!this.orden.historial) this.orden.historial = [];
        this.orden.historial.push(actualizacion);

        this.progresoActual = index;
        index++;
        setTimeout(avanzarPaso, 1500);
      } else {
        // Animación completa
        this.mostrandoModal = false;
        this.progresoActual = this.pasos.length;
      }
    };

    avanzarPaso();
  }
}
