import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BackendService, CommonService } from 'src/app/services';
import { SHARED } from '../../shared';

@Component({
  selector: 'app-supplies',
  standalone: true,
  imports: [SHARED],
  templateUrl: './supplies.component.html',
  styleUrl: './supplies.component.scss'
})
export class SuppliesComponent implements OnInit {
  supplies:  Observable<any[]>;
  dummyRest:  Observable<any[]>;
  dummy = Array(10);
  instock: string;
  constructor(
    private api: BackendService,private comm: CommonService
    ,private router: Router
  ) {
    this.getSupplies(this.comm.getCurrentRestaurant().uid);
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

  getSupplies(restaurantId: string) {
    this.supplies = this.api.getSupplies(restaurantId);
    this.dummyRest = this.supplies;
      this.dummy = [];
  }

  search(string) {
    this.resetChanges();
    console.log('string', string);
    this.supplies = this.filterItems(string);
  }


  protected resetChanges = () => {
    this.supplies = this.dummyRest;
  }

  setFilteredItems() {
    console.log('clear');
    this.supplies = new Observable();
    this.supplies = this.dummyRest;
  }

  filterItems(searchTerm) {
    return this.supplies.pipe(
      filter((item:any) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }));

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
    this.router.navigate(['suppliers-details'], navData);
  }

  changeStatus(item) {
    console.log(item);
    const text = item.status === 'open' ? 'close' : 'open';
    this.inputData = {
      title: 'Are you sure?',
      body: 'Do you want to ' + text + ' this restaurant?',
    }
    const param = {
      uid: item.uid,
      isClose: true,
      status: text,
    };
        this.api.updateVenue(param).then(() => {
          this.loading = false;
          this.getSupplies("");
          this.comm.openSnackBar('Restaurant ' + text + ' Successfully');
        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
        const userStatus = text === 'open' ? 'active' : 'deactive';
        const statusChange = {
          status: userStatus
        };
        this.api.updateProfile(item.uid, statusChange).then(data => {
          console.log(data);
        }).catch(error => {
          console.log(error);
        });
      }
   

  createNew() {
    const navData: NavigationExtras = {
      queryParams: {
        new: true
      }
    };
    this.router.navigate(['supplies-details'], navData);
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }
}
