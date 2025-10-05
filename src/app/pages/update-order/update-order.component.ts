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
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Order, OrderStatus } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-update-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './update-order.component.html',
})
export class UpdateOrderComponent {
  order: Order | null = null;
  allowed: OrderStatus[] = [];

  findForm!: UntypedFormGroup;
  updateForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private orders: OrderService,
    private notify: NotificationService
  ) {
    this.findForm = this.fb.group({
      packageNumber: ['', [Validators.required]],
    });

    this.updateForm = this.fb.group({
      state: ['', [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(40)]],
      responsible: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/)]],
    });
  }

  find() {
    if (this.findForm.invalid) {
      this.notify.error('Debes ingresar el número de paquete.');
      this.findForm.markAllAsTouched();
      return;
    }
    const num = this.findForm.get('packageNumber')!.value as string;
    this.order = this.orders.findByPackageNumber(num);
    this.allowed = this.order ? this.orders.allowedNextStates(this.order.status) : [];
    if (!this.order) {
      this.notify.error('No se encontró el paquete con ese número.');
    } else {
      this.notify.success('Orden encontrada.');
      this.updateForm.reset();
    }
  }

  submitUpdate() {
    if (!this.order) return;
    if (this.updateForm.invalid) {
      this.notify.error('Revisa estado, comentario y responsable.');
      this.updateForm.markAllAsTouched();
      return;
    }
    const val = this.updateForm.getRawValue() as any;
    const res = this.orders.updateStatusByPackage(
      this.order.packageNumber,
      val.state as OrderStatus,
      val.comment,
      val.responsible
    );

    if (res.ok) {
      this.notify.success(`Estado actualizado a "${val.state}".`);
      this.find();
    } else {
      this.notify.error(res.error);
    }
  }
}
