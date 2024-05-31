import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./supply-details.component').then(m => m.SupplyDetailsComponent),
    data: {
      title: $localize`Supply Details`
    }
  }
];

