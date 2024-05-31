import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./drivers.component').then(m => m.DriversComponent),
    data: {
      title: $localize`Drivers`
    }
  }
];

