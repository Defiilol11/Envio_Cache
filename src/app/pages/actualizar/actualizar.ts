import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdenService, Orden, Actualizacion } from '../../services/orden.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./actualizar.css']
})
export class Actualizar implements OnInit {
  orden: Orden | undefined;
  estados = ['Creado', 'En proceso', 'Recogido de bodega', 'En camino', 'Entregado'];

  modalEditOpen = false;
  modalConfirmOpen = false;

  estado = '';
  comentario = '';
  responsable = '';

  constructor(private router: Router, private route: ActivatedRoute, private ordenService: OrdenService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const numero = +params['numero'];
      if (numero) {
        this.orden = this.ordenService.buscarOrden(numero);
      }
    });
  }

  abrirModalEditar() {
    if (!this.orden) return;
    this.estado = this.orden.estado;
    this.comentario = '';
    this.responsable = '';
    this.modalEditOpen = true;
  }

  editar() {
    if (!this.orden) return;
    if (!this.estado || !this.comentario || !this.responsable) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const actualizacion: Actualizacion = {
      estado: this.estado,
      comentario: this.comentario,
      responsable: this.responsable,
      fecha: new Date()
    };

    if (!this.orden.historial) this.orden.historial = [];
    this.orden.historial.push(actualizacion);
    this.orden.estado = this.estado;

    this.ordenService.actualizarOrden(this.orden.numero, actualizacion);

    this.modalEditOpen = false;
    alert('Orden actualizada correctamente');
  }

  abrirModalConfirmar() {
    this.modalConfirmOpen = true;
  }

  confirmar() {
    this.modalConfirmOpen = false;
    alert('Orden confirmada, todo bien');
    this.router.navigate(['/seguimiento'], { queryParams: { numero: this.orden?.numero } });
  }
}
