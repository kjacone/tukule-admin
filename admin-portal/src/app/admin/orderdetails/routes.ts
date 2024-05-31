import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./orderdetails.component').then(m => m.OrderdetailsComponent),
    data: {
      title: $localize`Order Details`
    }
  }
];

