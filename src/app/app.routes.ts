import { Routes } from '@angular/router';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { UpdateOrderComponent } from './pages/update-order/update-order.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';

export const routes: Routes = [
  { path: 'crear', component: CreateOrderComponent },
  { path: 'actualizar', component: UpdateOrderComponent },
  { path: 'seguimiento', component: TrackOrderComponent },
  { path: '', pathMatch: 'full', redirectTo: 'crear' },
  { path: '**', redirectTo: 'crear' },
];
