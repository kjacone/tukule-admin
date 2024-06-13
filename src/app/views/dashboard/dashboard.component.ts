import { AsyncPipe, DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { SHARED } from '../../shared';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { CommonService, BackendService } from '../../services';
import { cilArrowRight, cilChartPie } from '@coreui/icons';
import { OrdersComponent } from 'src/app/admin/orders/orders.component';
import { UsersFragmentComponent } from 'src/app/fragments/';
import {
  Auth,
  authState,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  getAuth,
  User,
} from '@angular/fire/auth';
import { OrderFragmentComponent } from "../../fragments/order-fragment/order-fragment.component";
import { FoodFragmentComponent } from "../../fragments/food-fragment/food-fragment.component";
import { MenuFragmentComponent } from "../../fragments/menu-fragment/menu-fragment.component";


@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    standalone: true,
    imports: [ChartjsComponent, IconDirective, ReactiveFormsModule,
        SHARED, OrdersComponent, UsersFragmentComponent, AsyncPipe,
        NgStyle, OrderFragmentComponent, FoodFragmentComponent,MenuFragmentComponent]
})
export class DashboardComponent implements OnInit {
open(arg0: string,arg1: boolean) {
// this.navigate(arg0,arg1);
}
  icons = { cilChartPie, cilArrowRight };
  auth: Auth = inject(Auth);
  user$  = user(this.auth);
  constructor(private comm: CommonService,private api: BackendService) {
    
    this.user$.subscribe((userData: any) => {
      // Do something with the user data
      this.currentUser = userData;
      console.log(userData);
      this.getRest(userData.email);
      
    });
      
      
      
    
   
  }


  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);


  currentUser:any;
  rest: any ={email:''};
  userType:string;
  

 

  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  ngOnInit(): void {
   
      
      


    this.initCharts();
    this.updateChartOnColorModeChange();
    
  }

 

  getRest(email) {
   this.rest = this.api.getSingleVenues(email).then((data) => {
     console.log(data);
     this.rest = data;
     console.log('rest: ',this.rest);
     this.userType = this.rest.restaurantCode;
     console.log(this.userType);
   this.comm.setRestaurant(this.rest);
   
   }, (error)=>{
     console.log(error);
   }
  );
   
  }

  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.#chartsData.initMainChart(value);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }
}
