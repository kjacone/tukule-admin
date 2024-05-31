import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./userdetails.component').then(m => m.UserdetailsComponent),
    data: {
      title: $localize`User Details`
    }
  }
];

