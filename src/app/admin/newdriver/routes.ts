import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./newdriver.component').then(m => m.NewdriverComponent),
    data: {
      title: $localize`New Driver Details`
    }
  }
];

