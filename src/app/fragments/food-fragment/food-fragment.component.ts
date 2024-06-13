import { Component, Input } from '@angular/core';
import { BackendService, CommonService } from '../../services';
import { SHARED } from '../../shared';

@Component({
  selector: 'app-food-fragment',
  standalone: true,
  imports: [SHARED],
  templateUrl: './food-fragment.component.html',
  styleUrl: './food-fragment.component.scss'
})
export class FoodFragmentComponent {
  orders: any[] = [];
  dummy = Array(10);
  dummyOrders: any[] = [];
  @Input() order: any;
  instock: string;
  constructor(public api: BackendService, private comm: CommonService) {

   
    this.getFoods();
  }
  getClass(item) {
    if (item.instock == item.reorder) {
      this.instock = "outofstock";
      return 'btn btn-danger btn-round';
    } else  {
      this.instock = "available";
      return 'btn btn-success btn-round';
    }
  }

  getFoods() {
    let me = this.comm.getCurrentRestaurant().restaurantCode;
    this.orders = [];
    this.dummyOrders = [];
    this.api.getSpecificItems('foods', 'restaurant.uid', me).subscribe(
      (data) => {
        this.dummy = [];
        console.log('foods data', data);
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

