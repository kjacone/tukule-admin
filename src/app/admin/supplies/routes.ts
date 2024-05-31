import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./supplies.component').then(m => m.SuppliesComponent),
    data: {
      title: $localize`Supplies`
    }
  }
];

