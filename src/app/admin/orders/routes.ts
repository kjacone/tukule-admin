import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./orders.component').then(m => m.OrdersComponent),
    data: {
      title: $localize`Orders`
    }
  }
];

