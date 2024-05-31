import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./restdetails.component').then(m => m.RestdetailsComponent),
    data: {
      title: $localize`Restaurant Details`
    }
  }
];

