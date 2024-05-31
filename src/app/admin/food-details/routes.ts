import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./food-details.component').then(m => m.FoodDetailsComponent),
    data: {
      title: $localize`Food Details`
    }
  }
];

