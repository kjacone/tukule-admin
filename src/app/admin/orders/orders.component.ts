import { Component, OnInit } from '@angular/core';
import { BackendService, CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
import { Router, NavigationExtras } from '@angular/router';


interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SHARED],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent  implements OnInit {
  visible = false;
  loading = false;
  inputData: any = {
    title: '',
    body: '',
  };
  confirm = false;
  orders: any[] = [];
  dummOrders: any[] = [];
  dummy = Array(10);
  
  constructor(
    private api: BackendService,private comm: CommonService
    ,private router: Router
  ) {
    this.getAllOrders();


    
  }

  public users: IUser[] = [
    
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/images/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/images/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/images/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/images/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/images/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/images/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/images/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/images/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/images/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    },
  ];
  ngOnInit() {
  }

  getAllOrders() {
    this.api.getAllOrders().subscribe((data:any) => {
      console.log('orders data', data);
      data.forEach((element:any) => {
        element.time = new Date(element.time);
        element.order = JSON.parse(element.order);
      });
      data.sort((a, b) => b.time - a.time);
      this.orders = [...data];
      this.dummOrders = [...data];
      this.dummy = [];
    }, error => {
      console.log(error);
      this.dummy = [];
    });
  }

 
  search(string:any) {
    this.resetChanges();
    console.log('string', string.value);
    this.orders = this.filterItems(string.value);
  }
  handleConfirmation() {
    // Perform the action (e.g., delete, save, etc.)
    // Return a promise if
    this.confirm = true;
    this.loading = true;
    console.log('Confirmed! Perform the action here.');
  }



  protected resetChanges = () => {
    this.orders = this.dummOrders;
  }

  setFilteredItems() {
    console.log('clear');
    this.orders = [];
    this.orders = this.dummOrders;
  }

  filterItems(searchTerm) {
    return this.orders.filter((item) => {
      return item.id.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }


  getClass(item) {
    if (item === 'created' || item === 'accepted' || item === 'picked') {
      return 'btn btn-primary btn-round';
    } else if (item === 'delivered') {
      return 'btn btn-success btn-round';
    } else if (item === 'rejected' || item === 'cancel') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-a btn-round';
  }

  openOrder(item) {
    console.log(item);
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id
      }
    };
    this.router.navigate(['order-details'], navData);
  }
  getDates(date) {
    return this.comm.getDate(date);
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }
}
