import { Component, OnInit } from '@angular/core';
import { BackendService, CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
import { Router, NavigationExtras } from '@angular/router';

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
