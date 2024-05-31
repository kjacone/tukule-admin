import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./newcities.component').then(m => m.NewcitiesComponent),
    data: {
      title: $localize`Cities`
    }
  }
];

