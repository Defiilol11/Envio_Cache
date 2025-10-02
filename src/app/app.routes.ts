import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Crear } from './pages/crear/crear';
import { Actualizar } from './pages/actualizar/actualizar';
import { Seguimiento } from './pages/seguimiento/seguimiento';

const routes: Routes = [
  { path: '', redirectTo: 'crear', pathMatch: 'full' },
  { path: 'crear', component: Crear },
  { path: 'actualizar', component: Actualizar },
  { path: 'seguimiento', component: Seguimiento },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };
