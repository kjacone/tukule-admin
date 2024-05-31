import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard} from './services/guard/auth.guard'

export const routes: Routes = [
  
 
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-dashboard',
        loadChildren: () => import('./admin/admin-dashboard/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'cities',
        loadChildren: () => import('./admin/cities/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'newcities',
        loadChildren: () => import('./admin/newcities/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'restaurants',
        loadChildren: () => import('./admin/restaurants/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'restaurants-details',
        loadChildren: () => import('./admin/restdetails/routes').then(m => m.routes),
        // canActivate: [AuthGuard]
      },
      {
        path: 'supplies',
        loadChildren: () => import('./admin/supplies/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'supplies-details',
        loadChildren: () => import('./admin/supply-details/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'foods',
        loadChildren: () => import('./admin/food/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'food-details',
        loadChildren: () => import('./admin/food-details/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'users/:type',
        loadChildren: () => import('./admin/users/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'user-details',
        loadChildren: () => import('./admin/userdetails/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'drivers',
        loadChildren: () => import('./admin/drivers/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'new-driver',
        loadChildren: () => import('./admin/newdriver/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        loadChildren: () => import('./admin/orders/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
      {
        path: 'orders-details',
        loadChildren: () => import('./admin/orderdetails/routes').then(m => m.routes),
        canActivate: [AuthGuard]
      },
   
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    
    ]
  },
  {
    path: '',
    data: {
      title: 'Authentication'
    },
    children: [ 
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      },     
      {
        path: 'setup',
        loadChildren: () => import('./admin/setup/routes').then(m => m.routes)
      },
      {
        path: 'auth',
        loadChildren: () => import('./views/auth/routes').then(m => m.routes),
      }
    ]
  },
  
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
 

];
