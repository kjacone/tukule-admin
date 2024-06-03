import { Component ,OnInit,Input} from '@angular/core';
import { BackendService,CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SHARED],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  visible = false;
  loading = false;
  inputData: any = {
    title: '',
    body: '',
  };
  confirm = false;

  users: any[] = [];
  dummy = Array(10);
  dummyUsers: any[] = [];
  user: any ="user"; 
  constructor(
    private api: BackendService,private comm: CommonService
    ,private router: Router,private route: ActivatedRoute
  ) {
   
 
  }
    ngOnInit() {
      this.route.params.subscribe((data:any) => {
        this.user = data.type;
        console.log('User:: ',this.user);
        this.getUsers();
      });
    }
    getUsers() {
      this.users = [];
      this.dummyUsers = [];
      this.api.getSpecificItems('users','type',this.user).subscribe((data) => {
        this.dummy = [];
        console.log('users data', data);
        this.users = [...data]; // Create a new array by spreading the data
    this.dummyUsers = [...data]; // Create a new array by spreading the data
    
        console.log(this.users);
      }, error => {
        console.log(error);
        this.dummy = [];
      });
    }
    search(string:any) {
      this.resetChanges();
      console.log('string', string.value);
      this.users = this.filterItems(string.value);
    }
  
  
    handleConfirmation() {
      // Perform the action (e.g., delete, save, etc.)
      // Return a promise if
      this.confirm = true;
      this.loading = true;
      console.log('Confirmed! Perform the action here.');
    }
    protected resetChanges = () => {
      this.users = this.dummyUsers;
    }
  
    setFilteredItems() {
      console.log('clear');
      this.users = [];
      this.users = this.dummyUsers;
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
    

    
    filterItems(searchTerm) {
      return this.users.filter((item) => {
        return (item.fname+' '+item.lname).indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  
    openUser(item) {
      const navData: NavigationExtras = {
        queryParams: {
          id: item.uid
        }
      };
      this.router.navigate(['user-details'], navData);
    }
  }
  

