import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./setup.component').then(m => m.SetupComponent),
    data: {
      title: "setup"
    }
  }
];

