import { Component, OnInit, Input } from '@angular/core';
import { BackendService, CommonService } from 'src/app/services';
import { SHARED } from '../../shared';

@Component({
  selector: 'app-users-fragment',
  standalone: true,
  imports: [SHARED],
  templateUrl: './users-fragment.component.html',
  styleUrl: './users-fragment.component.scss',
})
export class UsersFragmentComponent implements OnInit {
  users: any[] = [];
  dummy = Array(10);
  dummyUsers: any[] = [];
  @Input() user: any;
  constructor(private api: BackendService, private comm: CommonService) {

   
    // this.getUsers();
  }
  ngOnInit() {
   
  }

  getUsers() {
    let me = this.comm.getCurrentRestaurant().restaurantCode;
    this.users = [];
    this.dummyUsers = [];
    this.api.getSpecificItems('users', 'restaurantCode', me).subscribe(
      (data) => {
        this.dummy = [];
        console.log('users data', data);
        this.users = [...data]; // Create a new array by spreading the data
        this.dummyUsers = [...data]; // Create a new array by spreading the data

        console.log(this.users);
      },
      (error) => {
        console.log(error);
        this.dummy = [];
      }
    );
  }
}
