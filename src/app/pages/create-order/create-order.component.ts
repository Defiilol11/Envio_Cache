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
  selector: 'app-create-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-order.component.html',
})
export class CreateOrderComponent {
  created?: Order | null = null;

  form!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private orders: OrderService,
    private notify: NotificationService
  ) {
    this.form = this.fb.group({
      senderName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[A-Za-z0-9._%+-]+@(gmail\.com|outlook\.com)$/i),
        ],
      ],
      street: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      municipality: ['', [Validators.required]],
      department: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(40), Validators.maxLength(120)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.notify.error('Revisa los campos del formulario.');
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue() as any;
    this.created = this.orders.createOrder({
      senderName: value.senderName,
      street: value.street,
      zone: value.zone,
      municipality: value.municipality,
      department: value.department,
      email: value.email,
      description: value.description,
    });
    this.notify.success(
      `Orden creada. Paquete #${this.created.packageNumber} | Seguimiento ${this.created.trackingId}`
    );
    this.form.reset();
  }
}
