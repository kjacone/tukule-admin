import { Component ,OnInit} from '@angular/core';
import { BackendService,CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-food',
  standalone: true,
  imports: [SHARED],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent {
  foods: any[];
  dummyRest: any[];
  instock: string;
dummy: any;
  constructor(
    private api: BackendService,private comm: CommonService
    ,private router: Router
  ) {

    this.getFoods();
  }
  visible = false;
  loading = false;
  inputData: any = {
    title: '',
    body: '',
  };
  confirm = false;
  handleConfirmation() {
    // Perform the action (e.g., delete, save, etc.)
    // Return a promise if
    this.confirm = true;
    this.loading = true;
    console.log('Confirmed! Perform the action here.');
  }

  getFoods() {

    const restId = this.comm.getCurrentRestaurant().restaurantCode;
    this.api.getFoods(restId).subscribe((data) => {
      console.log('foods data', data);
      this.foods = [...data];
      this.dummyRest = [...data];
      this.dummy = [];
    }, error => {
      console.log(error);
      this.dummy = [];
    });
  }

  search(string) {
    this.resetChanges();
    console.log('string', string);
    this.foods = this.filterItems(string);
  }


  protected resetChanges = () => {
    this.foods = this.dummyRest;
  }

  setFilteredItems() {
    console.log('clear');
    this.foods = [];
    this.foods = this.dummyRest;
  }

  filterItems(searchTerm) {
    return this.foods.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  ngOnInit() {
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

  openSupply(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id,
        register: false
      }
    };
    this.router.navigate(['food-details'], navData);
  }

  
   

  createNew() {
    const navData: NavigationExtras = {
      queryParams: {
        new: true
      }
    };
    this.router.navigate(['food-details'], navData);
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }
}
