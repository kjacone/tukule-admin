// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    host: 'localhost:8081',
        ssl: false,
  apiKey: "AIzaSyDBEsvLqBn5as2oNheMK2ipxDfA9rSNRbo",
  authDomain: "tukule-foods.firebaseapp.com",
  projectId: "tukule-foods",
  storageBucket: "tukule-foods.appspot.com",
  messagingSenderId: "598675151197",
  appId: "1:598675151197:web:02f61f13fbd5cde07cf0b4",
  measurementId: "G-4FGZ3Q19QM"
  },
  onesignal: {
    appId: '',
    googleProjectNumber: '',
    restKey: ''
  },
  stripe: {
    sk: ''
  },
  paypal: {
    sandbox: '',
    production: 'YOUR_PRODUCTION_CLIENT_ID'
  },
  general: {
    secret:'AIzaSyDBEsvLqBn5as2oNheMK2ipxDfA9rSNRbo',
    apiKey:'AIzaSyCwFvET7jbg6iesvbMJLyAjsYIgS3FZ72o',
    symbol: 'KES',
    code: 'KES'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
