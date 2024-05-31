import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService, CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [
    SHARED
  ],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss',
})
export class CitiesComponent implements OnInit {
  visible = false;
  loading = false;
  inputData: any = {
    title: '',
    body: '',
  };
  confirm = false;
  cities: any;
  dummy = Array(50);
  constructor(
    private router: Router,
    private api: BackendService,
    private common: CommonService
  ) {
    this.getCity();
  }

  ngOnInit() { }
  getCity() {
    this.api
      .getCities()
      .then((data) => {
        console.log(data);
        this.cities = data;
        this.dummy = [];
      })
      .catch((error) => {
        console.log(error);
        this.dummy = [];
      });
  }
  createNew() {
    this.router.navigate(['/newcities']);
  }
  handleConfirmation() {
    // Perform the action (e.g., delete, save, etc.)
    // Return a promise if
    this.confirm = true;
    this.loading = true;
    console.log('Confirmed! Perform the action here.');
  }

  getClass(item) {
    if (item === 'active') {
      return 'btn btn-primary btn-round';
    } else if (item === 'deactive') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  changeStatus(item) {
    const text = item.status === 'active' ? 'deactive' : 'active';
    this.inputData = {
      title: 'Are you sure?',
      body: 'Do you want to ' + text + ' this city?',
    };
    this.visible = true;
   
    if (confirm) {
    this.api
      .updateCity(item)
      .then(
        (data) => {
        
          this.getCity();
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      )
      .catch((error) => {
        this.loading = false;
        console.log(error);
      });
    }
  }
  delete(item) {
    this.inputData = {
      title: 'Are you sure?',
      body: 'Do you want to delete this city?',
    };
    this.visible = true;
   
    if (confirm) {
      this.api
        .deleteCity(item)
        .then(
          (data) => {
            this.loading = false;
            this.getCity();
          },
          (error) => {
            console.log(error);
            this.loading = false;
          }
        )
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    }
    this.confirm = false;
  }
}
