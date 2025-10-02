import { Injectable } from '@angular/core';

export interface Actualizacion {
  fecha: Date;
  estado: string;
  comentario: string;
  responsable: string;
}

export interface Orden {
  id: string;
  numero: number;
  estado: string;
  nombre: string;
  direccion: string;
  correo: string;
  descripcion: string;
  historial: Actualizacion[];
}

@Injectable({ providedIn: 'root' })
export class OrdenService {
  private ordenes: Orden[] = [];

  crearOrden(orden: Orden) {
    this.ordenes.push(orden);
  }

  buscarOrden(numero: number): Orden | undefined {
    return this.ordenes.find(o => o.numero === numero);
  }

  actualizarOrden(numero: number, actualizacion: Actualizacion) {
    const orden = this.buscarOrden(numero);
    if (orden) {
      orden.estado = actualizacion.estado;
      orden.historial.push(actualizacion);
    }
  }
}
