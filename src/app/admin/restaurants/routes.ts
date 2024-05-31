import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./restaurants.component').then(m => m.RestaurantsComponent),
    data: {
      title: $localize`Restaurants`
    }
  }
];

