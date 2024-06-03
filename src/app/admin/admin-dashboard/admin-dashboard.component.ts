import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService, CommonService } from '../../services';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { CardComponent} from '@coreui/angular';
import {  NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CardComponent,NgxSkeletonLoaderModule,FormsModule, CommonModule, NgStyle],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  rest$ = this.api.getVenues() as Observable<DocumentData[]>;
  users$ = this.api.getUsers() as Observable<DocumentData[]>;
  drivers$ = this.api.getUsers() as Observable<DocumentData[]>;
  orders$ = this.api.getAllOrders() as Observable<DocumentData[]>;
  displayOrders: any[] = [];
  dummy = Array(10);
  currentUser: any;
  user$ = this.api.user$;
  constructor(
    private route: ActivatedRoute,
    private api: BackendService,private comm: CommonService,
    private router: Router
  ) {
    // this.currentUser = this.comm.getCurrentUser();

  }

  ngOnInit() {
  }


  getDates(date) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  getClass(item) {
    if (item === 'created' || item === 'accepted' || item === 'picked') {
      return 'btn btn-primary btn-round';
    } else if (item === 'delivered') {
      return 'btn btn-success btn-round';
    } else if (item === 'rejected' || item === 'cancel') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  openOrder(item) {
    console.log(item);
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id
      }
    };
    this.router.navigate(['admin-orderdetails'], navData);
  }

  getCurreny() {
    return this.api.getCurrecySymbol();
  }
}

