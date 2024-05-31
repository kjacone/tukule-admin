import { Component ,OnInit} from '@angular/core';
import { BackendService,CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [SHARED],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss',
})
export class RestaurantsComponent implements OnInit {
  rest: any[] = [];
  dummyRest: any[] = [];
  dummy = Array(10);
  constructor(
    private api: BackendService,private comm: CommonService
    ,private router: Router
  ) {
    this.getRest();
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

  getRest() {
    this.api.getVenues().then((data) => {
      console.log('rest data', data);
      this.rest = data;
      this.dummyRest = data;
      this.dummy = [];
    }, error => {
      console.log(error);
      this.dummy = [];
    }).catch(error => {
      console.log(error);
      this.dummy = [];
    });
  }

  search(string) {
    this.resetChanges();
    console.log('string', string);
    this.rest = this.filterItems(string);
  }


  protected resetChanges = () => {
    this.rest = this.dummyRest;
  }

  setFilteredItems() {
    console.log('clear');
    this.rest = [];
    this.rest = this.dummyRest;
  }

  filterItems(searchTerm) {
    return this.rest.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  ngOnInit() {
  }
  getClass(item) {
    if (item === 'created' || item === 'accepted' || item === 'picked') {
      return 'btn btn-primary btn-round';
    } else if (item === 'delivered' || item === 'open') {
      return 'btn btn-success btn-round';
    } else if (item === 'rejected' || item === 'cancel') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  openRest(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id,
        register: false
      }
    };
    this.router.navigate(['restaurants-details'], navData);
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
          this.getRest();
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
        register: true,
        id: this.comm.generateRandomUid()
      }
    };
    this.router.navigate(['restaurants-details'], navData);
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }
}
