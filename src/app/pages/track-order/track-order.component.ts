import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './track-order.component.html',
})
export class TrackOrderComponent {
  order: Order | null = null;

  form!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private orders: OrderService,
    private notify: NotificationService
  ) {
    this.form = this.fb.group({
      trackingId: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{12}$/)]],
    });
  }

  search() {
    if (this.form.invalid) {
      this.notify.error('Ingresa un código de seguimiento válido (12 letras).');
      this.form.markAllAsTouched();
      return;
    }
    const id = this.form.get('trackingId')!.value as string;
    this.order = this.orders.findByTrackingId(id);
    if (!this.order) {
      this.notify.error('No se encontró el paquete con ese código.');
    } else {
      this.notify.success('Seguimiento encontrado.');
    }
  }

  historyAsc() {
    if (!this.order) return [];
    return [...this.order.history].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
}
