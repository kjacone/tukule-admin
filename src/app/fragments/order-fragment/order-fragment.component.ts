import { Component, Input } from '@angular/core';
import { BackendService, CommonService } from 'src/app/services';
import { SHARED } from '../../shared';

@Component({
  selector: 'app-order-fragment',
  standalone: true,
  imports: [SHARED],
  templateUrl: './order-fragment.component.html',
  styleUrl: './order-fragment.component.scss'
})
export class OrderFragmentComponent {
  orders: any[] = [];
  dummy = Array(10);
  dummyOrders: any[] = [];
  @Input() order: any;
  constructor(private api: BackendService, private comm: CommonService) {

   
    // this.getOrders();
  }
 

  getOrders() {
    let me = this.comm.getCurrentRestaurant().restaurantCode;
    this.orders = [];
    this.dummyOrders = [];
    this.api.getSpecificItems('orders', 'restaurant.uid', me).subscribe(
      (data) => {
        this.dummy = [];
        console.log('orders data', data);
        this.orders = [...data]; // Create a new array by spreading the data
        this.dummyOrders = [...data]; // Create a new array by spreading the data

        console.log(this.orders);
      },
      (error) => {
        console.log(error);
        this.dummy = [];
      }
    );
  }
}

