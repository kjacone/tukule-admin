export const environment = {
  production: true,
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
    symbol: '$',
    code: 'USD'
  }
};
