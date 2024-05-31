import { Provider } from "@angular/core";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";
import { LoaderComponent } from "./loader/loader.component";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective,
     CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, 
      ButtonDirective,
     NavComponent,
     NavItemComponent,
     NavLinkDirective,
     TabContentComponent,
     TabContentRefDirective,
     TabPaneComponent,
     AvatarComponent,
     BadgeComponent,
     ButtonGroupComponent,
     CardFooterComponent,
     CardHeaderComponent,
     FormCheckLabelDirective,
     GutterDirective,
     ProgressBarComponent,
     ProgressBarDirective,
     ProgressComponent,
     TableDirective, TemplateIdDirective, WidgetStatFComponent 
    } from '@coreui/angular';   
      import { ChartjsComponent } from '@coreui/angular-chartjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


 
import { StarRatingModule } from 'angular-star-rating';


export const SHARED: Provider[] = [  
    ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent,
     CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, ButtonDirective 
    ,IconDirective,ConfirmModalComponent,NgxSkeletonLoaderModule,CommonModule, NgStyle,MatGoogleMapsAutocompleteModule,
    LoaderComponent,FormsModule,  NavComponent,ChartjsComponent,
    NavItemComponent,StarRatingModule,
    NavLinkDirective,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,MatIconModule,
    TabContentComponent,
    TabContentRefDirective,
    TabPaneComponent, TemplateIdDirective, WidgetStatFComponent ,
    NgMultiSelectDropDownModule,
    AvatarComponent,
    BadgeComponent,
    ButtonGroupComponent,
    CardFooterComponent,
    CardHeaderComponent,
    FormCheckLabelDirective,
    GutterDirective,
    ProgressBarDirective,ProgressBarComponent,
    ProgressComponent,
    TableDirective,
];