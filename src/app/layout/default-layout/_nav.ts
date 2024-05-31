import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Orders',
    url: '/orders',
    iconComponent: { name: 'cil-basket' },
    children: [
      {
        name: 'Pending Orders',
        url: '/orders',
        
      },
      {
        name: 'Paid Orders',
        url: '/orders',
      
      },
      {
        name: 'Rejected Orders',
        url: '/orders',
       
      }]
  },
  {
    name: 'Food Menus',
    iconComponent: { name: 'cil-notes' },
  
    url: '/',
    children: [
      {
      
        name: 'Food Categories',
        url: '/foods'
      },
    ]
  },
 
  {
    name: 'User Management',
    iconComponent: { name: 'cil-people' },
    url: '/',
    children: [
      {
      
        name: 'Cashiers',
        url: '/users/owner',
       
      },
      {
       
        name: 'Waiters',
        url: '/users/admin'
      }, 
      {
       
        name: 'Suppliers',
        url: '/users/owner'
      }, 
    ]
  },
 
  {
    name: 'Supply Management',
    iconComponent: { name: 'cil-storage' },
    url: '/',
    children: [
      {
        name: ' Available',
        url: '/supplies'
      },
      {
        name: 'Out of Stock',
        url: '/supplies'
      }
    ]
  },
 
  
  {
    name: 'logout',
    iconComponent: { name: 'cil-account-logout' },
    url: '/auth'
  }

];
