import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { RouterLink, Router, NavigationExtras } from '@angular/router';
import { CommonService } from '../../../services/common/common.service';
import { BackendService } from '../../../services/backend/backend.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,

  imports: [
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    RouterLink,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
  ],
})
export class LoginComponent {
  email: any = 'lmutubachi@gmail.com';
  password: any = '1234567890';
  isLoading = false;
  constructor(
    private api: BackendService,
    private commonService: CommonService,
    private router: Router
  ) {}

  login = () => {
    this.isLoading = true;
    this.api.login();
    this.isLoading = false;
  };

  register = () => {
    this.isLoading = true;
    this.api.checkAuth().then((data:any) => {
      console.log(data.user);
      this.openPage(data.user, 'setup');
    });
    this.isLoading = false;
  };

  openPage(data:any,page:string) {
   
    const  queryParams = {
      user: JSON.stringify(data),
        // id: data.uid,
        register: 'true'
      }
  
    this.router.navigate([page,queryParams]);
  }
}
