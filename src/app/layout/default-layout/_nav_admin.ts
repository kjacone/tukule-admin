import { INavData } from '@coreui/angular';

export const navAdminItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin-dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Available Cities',
    url: '/cities',
    iconComponent: { name: 'cil-puzzle' }
  },
 
  {
    name: 'Restaurants',
    url: '/restaurants',
  
  },
  {
    name: 'Users',
    url: '/users'
 
  },
  {
    name: 'Drivers',
    url: '/drivers'
 
  }, 
  {
    name: 'Supplies',
    url: '/supplies'
 
  }, 
  {
    name: 'Foods',
    url: '/foods'
 
  }, 
  {
    name: 'Orders',
    url: '/orders'
 
  },
  {
    name: 'Manage',
    title: true
  },

  {
    name: 'Banners',
    url: '/base'
  },
  {
    name: 'Coupons',
    url: '/base'
  },
  {
    name: 'Notifiation',
    url: '/base/tables'
  },
  {
    name: 'Support',
    url: '/users'
  },
  {
    name: 'Restaurant Stats',
    url: '/widgets'
  },
  {
    name: 'Settings',
    title: true
  },
  
  {
    name: 'logout',
    url: '/auth/login'
  }

];
