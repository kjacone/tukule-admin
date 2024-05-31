import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ImageUploadService } from './services/image-upload/image-upload.service';
import { BackendService } from './services/backend/backend.service';
import { CommonService } from './services/common/common.service';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../app/environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { StarRatingModule } from 'angular-star-rating';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      CommonService,
      NgxSkeletonLoaderModule,
      MatSnackBar,
      MatIconModule,
      MatProgressSpinnerModule,
      BackendService,
      ImageUploadService,
      NgxMatFileInputModule,
      AngularFirestore,
      HttpClientModule,
      SidebarModule,
      DropdownModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuth,
      MatGoogleMapsAutocompleteModule.forRoot(environment.general.apiKey),
      NgMultiSelectDropDownModule.forRoot(),
      StarRatingModule.forRoot(),
    ),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    IconSetService,
    provideAnimations(),
  ],
};
