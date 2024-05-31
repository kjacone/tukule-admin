import { Component ,OnInit,Input} from '@angular/core';
import { BackendService,CommonService } from 'src/app/services';
import { SHARED } from '../../shared';


@Component({
  selector: 'app-users-fragment',
  standalone: true,
  imports: [SHARED],
  templateUrl: './users-fragment.component.html',
  styleUrl: './users-fragment.component.scss'
})
export class UsersFragmentComponent implements OnInit{
  users: any[] = [];
  dummy = Array(10);
  dummyUsers: any[] = [];
  @Input() user: string; 
  constructor(
    private api: BackendService,private comm: CommonService
  ) {

    
  }
    ngOnInit() {
      console.log("TYPE:",this.user);
      this.getUsers();
    }

    getUsers() {
      this.users = [];
      this.dummyUsers = [];
      this.api.getSpecificItems('users','type',this.user).then((data) => {
        this.dummy = [];
        console.log('users data', data);
        data.forEach(element => {
            this.users.push(element);
            this.dummyUsers.push(element);
        });
        console.log(this.users);
      }, error => {
        console.log(error);
        this.dummy = [];
      }).catch(error => {
        console.log(error);
        this.dummy = [];
      });
    }
}
