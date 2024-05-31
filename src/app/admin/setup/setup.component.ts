import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common/common.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { RestdetailsComponent} from '../restdetails/restdetails.component';
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
import { IconDirective } from '@coreui/icons-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    FormsModule,RestdetailsComponent,
    CommonModule,
    MatProgressSpinnerModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    MatIconModule,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    IconDirective,
    NgStyle,
  ],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
  // schemas: [NO_ERRORS_SCHEMA.bypassAll]
})
export class SetupComponent {
  email: any = '';
  password: any = '';
  isLoading = false;
  constructor(
    private api: BackendService,
    private commonService: CommonService,
    private router: Router
  ) {}

  login(): any {
    if (!this.email || !this.password) {
      this.commonService.openSnackBar('Validation Error All Fields are required');
      return false;
    }
    this.isLoading = true;
    this.api
      .createAdminProfile(this.email, this.password)
      .then(
        (data) => {
          console.log(data);
          this.isLoading = false;
          this.commonService.openSnackBarAction(
            'Success Admin Profile Created, Login Now with your credentials'
          ,'/auth');
         
         
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
          this.commonService.openSnackBar('Error: ' + error);
        }
      )
      .catch((error) => {
        this.isLoading = false;
        console.log(error);
        this.commonService.openSnackBar('Error: ' + error.message);
      });
  }
}