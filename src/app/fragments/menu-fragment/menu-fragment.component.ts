import { Component, Input } from '@angular/core';
import { BackendService, CommonService } from '../../services';
import { SHARED } from '../../shared';
import { MatButton } from '@angular/material/button';
import { MatList } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { cilList } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';
@Component({
  selector: 'app-menu-fragment',
  standalone: true,
  imports: [SHARED, MatListItem, MatList, MatButton, InfiniteScrollDirective
    ],
  templateUrl: './menu-fragment.component.html',
  styleUrl: './menu-fragment.component.scss',
})
export class MenuFragmentComponent {
  previousScrollPosition = 0;

  orders: any[] = [];
  dummy = Array(10);
  dummyOrders: any[] = [];
  @Input() order: any;
  instock: string;
add: any;

  constructor(private api: BackendService, private comm: CommonService,
    public iconSet: IconSetService) {
    this.getFoods();

    iconSet.icons = { cilList };
  }
  getClass(item) {
    if (item.instock == item.reorder) {
      this.instock = 'outofstock';
      return 'btn btn-danger btn-round';
    } else {
      this.instock = 'available';
      return 'btn btn-success btn-round';
    }
  }

  scrollCardsBack() {
    let cardsContainer = document.querySelector('.cards-container');
    cardsContainer.scrollBy({
      left: this.previousScrollPosition - 340,
      behavior: 'smooth',
    });
  }
  scrollCards() {
    let cardsContainer = document.querySelector('.cards-container');
    cardsContainer.scrollBy({
      left: this.previousScrollPosition + 340,
      behavior: 'smooth',
    });
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
