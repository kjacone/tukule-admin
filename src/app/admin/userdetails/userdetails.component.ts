import { Component ,OnInit} from '@angular/core';
import { BackendService,CommonService } from 'src/app/services';
import { SHARED } from '../../shared';
import { ActivatedRoute,RouterLink} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [SHARED,RouterLink],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent  implements OnInit{

  visible = false;
  loading = false;
  inputData: any = {
    title: '',
    body: '',
  };
  confirm = false;
  id: any;
  myaddress: any[] = [];
  name: any = '';
  email: any = '';
  photo: any = '';
  reviews$: Observable<any[]>;
  myOrders$:  Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private api: BackendService,private comm: CommonService
  ) {

    
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      if (data && data.id) {
        this.id = data.id;

        this.getProfile();
        this.getMyOrders();
        this.getAddress();
      }
    });


  }

  ngOnInit() {

  }
  getProfile() {
    this.api.getMyProfile(this.id).then((data: any) => {
      console.log('userdata', data);
      if (data) {
        this.name = data.fullname;
        this.photo = data && data.coverImage ? data.coverImage : 'assets/icon.png';
        this.email = data.email;
      this.reviews$=  this.api.getMyReviews(data.uid);
      }
    }).catch(error => {
      console.log(error);
    });
  }
  getAddress() {
    this.api.getMyAddress(this.id).then((data) => {
      console.log('my address', data);
      if (data) {
        this.myaddress = data;
      }
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }
getMyOrders() {
  const orderData :any = this.api.getMyOrders(this.id);
  this.myOrders$ = orderData
    .map(element => ({
      ...element,
      time: new Date(element.time),
      order: JSON.parse(element.order)
    }))
    .sort((a, b) => b.time.getTime() - a.time.getTime());
  console.log(this.myOrders$);
}

  getDate(date) {
    return this.comm.getDate(date);
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }
}
