import { Injectable } from '@angular/core';
import { Order, OrderStatus } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly STATES: OrderStatus[] = ['Creado', 'En preparación', 'En tránsito', 'Entregado', 'No entregado'];
  private readonly NEXT_BY_STATE: Record<OrderStatus, OrderStatus[]> = {
    'Creado': ['En preparación'],
    'En preparación': ['En tránsito', 'No entregado'],
    'En tránsito': ['Entregado', 'No entregado'],
    'Entregado': [],
    'No entregado': []
  };

  private orders: Order[] = [];
  private seq = 1000;

  listOrders(): Order[] {
    return this.orders.map(o => ({ ...o, history: [...o.history] }));
  }

  allowedNextStates(current: OrderStatus): OrderStatus[] {
    return [...(this.NEXT_BY_STATE[current] || [])];
  }

  findByPackageNumber(n: string | null | undefined): Order | null {
    const num = (n ?? '').trim();
    return this.orders.find(o => o.packageNumber === num) ?? null;
  }

  findByTrackingId(id: string | null | undefined): Order | null {
    const key = (id ?? '').trim().toLowerCase();
    return this.orders.find(o => o.trackingId.toLowerCase() === key) ?? null;
  }

  createOrder(input: {
    senderName: string;
    street: string;
    zone: string;
    municipality: string;
    department: string;
    email: string;
    description: string;
  }): Order {
    const order: Order = {
      packageNumber: this.generatePackageNumber(),
      trackingId: this.generateTrackingId(),
      senderName: input.senderName.trim(),
      address: {
        street: input.street.trim(),
        zone: input.zone.trim(),
        municipality: input.municipality.trim(),
        department: input.department.trim()
      },
      email: input.email.trim(),
      description: input.description.trim(),
      status: 'Creado',
      lastUpdatedAt: new Date(),
      history: [{
        date: new Date(),
        state: 'Creado',
        comment: 'Orden creada',
        responsible: 'Sistema'
      }]
    };
    this.orders.push(order);
    return { ...order, history: [...order.history] };
  }

  updateStatusByPackage(pkgNumber: string, newState: OrderStatus, comment: string, responsible: string):
    { ok: true; order: Order } | { ok: false; error: string } {

    const order = this.findByPackageNumber(pkgNumber);
    if (!order) return { ok: false, error: 'Orden no encontrada' };

    const allowed = this.allowedNextStates(order.status);
    if (!allowed.includes(newState)) {
      return { ok: false, error: 'Transición no permitida desde el estado actual' };
    }

    order.status = newState;
    order.lastUpdatedAt = new Date();
    order.history.push({
      date: new Date(),
      state: newState,
      comment: comment.trim(),
      responsible: responsible.trim()
    });

    return { ok: true, order: { ...order, history: [...order.history] } };
  }

  private generatePackageNumber(): string {
    return (++this.seq).toString();
  }

  private generateTrackingId(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let out = '';
    for (let i = 0; i < 12; i++) {
      out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return out;
  }
}