import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./cities.component').then(m => m.CitiesComponent),
    data: {
      title: $localize`Cities`
    }
  }
];

