import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService, CommonService } from '../../services';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { CardComponent} from '@coreui/angular';
import {  NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CardComponent,NgxSkeletonLoaderModule,FormsModule, CommonModule, NgStyle],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  rest: any[] = [];
  users: any[] = [];
  drivers: any[] = [];
  orders: any[] = [];
  displayOrders: any[] = [];
  dummy = Array(10);
  currentUser: any;
  constructor(
    private route: ActivatedRoute,
    private api: BackendService,private comm: CommonService,
    private router: Router
  ) {
    this.currentUser = this.comm.getCurrentUser();
    this.getRest();
    this.getUsers();
    this.getAllOrders();

  }

  ngOnInit() {
  }

  getRest() {
    this.api.getVenues().then((data) => {
      console.log('rest data', data);
      this.rest = data;
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }

  getUsers() {
    this.users = [];
    this.drivers = [];
    this.api.getUsers().then((data) => {
      console.log('users data', data);
      data.forEach(element => {
        if (element.type !== 'admin') {
          this.users.push(element);
        } else if (element.type === 'delivery') {
          this.drivers.push(element);
        }
      });
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }

  getAllOrders() {
    this.api.getAllOrders().then((data) => {
      console.log('orders data', data);
      data.forEach(element => {
        element.time = new Date(element.time);
      });
      data.sort((a, b) => b.time - a.time);
      this.orders = data;
      this.orders.forEach((element, i) => {
        if (i <= 9) {
          element.order = JSON.parse(element.order);
          this.displayOrders.push(element);
        }
      });
      this.dummy = [];
    }, error => {
      console.log(error);
      this.dummy = [];
    }).catch(error => {
      console.log(error);
      this.dummy = [];
    });
  }

  getDates(date) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  getClass(item) {
    if (item === 'created' || item === 'accepted' || item === 'picked') {
      return 'btn btn-primary btn-round';
    } else if (item === 'delivered') {
      return 'btn btn-success btn-round';
    } else if (item === 'rejected' || item === 'cancel') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  openOrder(item) {
    console.log(item);
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id
      }
    };
    this.router.navigate(['admin-orderdetails'], navData);
  }

  getCurreny() {
    return this.api.getCurrecySymbol();
  }
}

