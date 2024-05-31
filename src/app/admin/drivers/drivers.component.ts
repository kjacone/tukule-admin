import { Component, OnInit } from '@angular/core';
import { BackendService, CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [SHARED],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent  implements OnInit {
  visible = false;
  loading = false;
  inputData: any = {
    title: '',
    body: '',
  };
  confirm = false;
  drivers: any[] = [];
  dummy = Array(10);
  dummyDrivers: any[] = [];
  constructor(
    private api: BackendService,private comm: CommonService
    ,private router: Router
  ) {
    this.getUsers();
  }


  ngOnInit() {
  }

  getUsers() {
    this.drivers = [];
    this.dummyDrivers = [];
    this.api.getUsers().then((data) => {
      this.dummy = [];
      console.log('users data', data);
      data.forEach(element => {
        if (element.type !== 'delivery') {
          this.drivers.push(element);
          this.dummyDrivers.push(element);
        }
      });
      console.log(this.drivers);
    }, error => {
      this.dummy = [];
      console.log(error);
    }).catch(error => {
      this.dummy = [];
      console.log(error);
    });
  }

  search(string:any) {
    this.resetChanges();
    console.log('string', string.value);
    this.drivers = this.filterItems(string.value);
  }
  handleConfirmation() {
    // Perform the action (e.g., delete, save, etc.)
    // Return a promise if
    this.confirm = true;
    this.loading = true;
    console.log('Confirmed! Perform the action here.');
  }

  protected resetChanges = () => {
    this.drivers = this.dummyDrivers;
  }

  setFilteredItems() {
    console.log('clear');
    this.drivers = [];
    this.drivers = this.dummyDrivers;
  }

  filterItems(searchTerm) {
    return this.drivers.filter((item) => {
      return (item.fname+' '+item.lname).indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  createNew() {
    const navData: NavigationExtras = {
      queryParams: {
        register: true
      }
    };
    this.router.navigate(['newdriver'], navData);
  }
  getClass(item) {
    if (item === 'active') {
      return 'btn btn-primary btn-round';
    } else if (item === 'deactive') {
      return 'btn btn-outline btn-round';
    }
    return 'btn btn-a btn-round';
  }

  changeStatus(item) {
    const text = item.status === 'active' ? 'deactive' : 'active';
    console.log(text);
    this.inputData = {
      title: 'Are you sure?',
      body: 'Do you want to ' + text + ' this user?',
    }
    this.visible = true;
     
        this.api.updateProfile(item.uid, item).then((data) => {
          this.loading = false;
          this.getUsers();
        }, error => {
          console.log(error);
          this.loading = false;
        }).catch(error => {
          this.loading = false;
          console.log(error);
        });
      }
  
  openDriver(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.uid,
        register: false
      }
    };
    this.router.navigate(['new-driver'], navData);
  }
}
