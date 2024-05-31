import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { RouterLink, Router ,NavigationExtras} from '@angular/router';
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

    imports: [FormsModule, CommonModule,MatProgressSpinnerModule,
      RouterLink, ContainerComponent, RowComponent, ColComponent, CardGroupComponent,
       TextColorDirective, CardComponent, CardBodyComponent,
       FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  email: any = 'lmutubachi@gmail.com';
  password: any = '1234567890';
  isLoading = false;
  constructor( private api: BackendService,
    private commonService: CommonService,
    private router: Router) { }

  login():any {
    if (!this.email || !this.password) {
      this.commonService.openSnackBar('Validation Error All Fields are required');
      return false;
    }
    this.isLoading = true;
    this.api.login(this.email, this.password).then((data:any) => {
      this.api.getProfile(data.uid).then((info: any) => {
        this.isLoading = false;
        console.log('user information:{}',info);

        var userTokenData:any = {
          token: this.commonService.generateToken(),
          user: info
        }
        localStorage.setItem('user_data', JSON.stringify(userTokenData));
        if (info && info.type === 'admin') {
          this.commonService.openSnackBar('Success your login was Sucessful');
          
        
          this.router.navigate(['admin-dashboard'],userTokenData);
        } else {
          this.router.navigate(['dashboard'],userTokenData);
        
      }}, error => {
        this.isLoading = false;
        this.commonService.openSnackBar('Error: '+ error);
      }).catch(error => {
      this.isLoading = false;
        console.log(error);
        this.commonService.openSnackBar('Error: '+ error);
      });
    }, error => {
      this.isLoading = false;
      this.commonService.openSnackBar('Error: '+ error);
    }).catch(error => {
      this.isLoading = false;
      console.log(error);
      this.commonService.openSnackBar('Error: '+ error);
    });
  }

  openPage(data:any,page:string) {
    const navData: NavigationExtras = {
      queryParams: {
        info: data
      }
    };
    this.router.navigate([page], navData);
  }

}
