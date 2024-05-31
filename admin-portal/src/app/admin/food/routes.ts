import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./food.component').then(m => m.FoodComponent),
    data: {
      title: $localize`Foods Menus`
    }
  }
];

