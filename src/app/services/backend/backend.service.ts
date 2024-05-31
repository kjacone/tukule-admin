import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import  firebase from "firebase/compat/app";
import { BehaviorSubject, Timestamp } from 'rxjs';
import { environment } from '../../environments/environment';
export class AuthInfo {
  constructor(public $uid: string) { }

  isLoggedIn() {
    return !!this.$uid;
  }
}
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  static UNKNOWN_USER = new AuthInfo('');
  public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(BackendService.UNKNOWN_USER);
  constructor( private adb: AngularFirestore,
    private fireAuth: AngularFireAuth,

  ) { }

  
  getFoods(id: String)  {
    return new Promise<any>((resolve, reject) => {
    this.adb.collection('foods', ref => ref.where('restaurant.uid', '==', id)).get().subscribe(async (venue) => {
      
      let data = venue.docs.map(element => {
        let item = element.data() as any;
        console.log(item);    
        item.uid = element.id;
        return item;
      });
      resolve(data);
    }, error => {
      reject(error);
    });
  });
}
  public createDriver(
    email: string,
    password: string,
    fullname: string,
    coverImage: string,
    descriptions: string,
    phone: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            this.adb.collection('users').doc(res.user.uid).set({
              uid: res.user.uid,
              email: email,
              fullname: fullname,
              coverImage: coverImage,
              descriptions: descriptions,
              fcm_token: '',
              lat: '',
              lng: '',
              phone: phone,
              status: 'active',
              type: 'driver',
              id: res.user.uid,
              current: 'active'
            });
            resolve(res.user);
          }
        })
        .catch(err => {

          this.authInfo$.next(BackendService.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }
  public getMyOrders(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('orders', ref => ref.where('userId', '==', id)).get().subscribe(async (venue) => {
        let data = venue.docs.map(element => {
          let item = element.data() as any;
          item.vid.get().then(function (doc) {
            item.vid = doc.data();
            item.vid.id = doc.id;
          });
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  public getMyAddress(uid: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('address').doc(uid).collection('all').get().subscribe((data) => {
        var users = data.docs.map(doc => {
          var item = doc.data() as any;
          item.id = doc.id;
          return item;
        });
        resolve(users);
      }, error => {
        reject(error);
      });
    });
  }
  public getCommons(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('commons').doc('app').get().subscribe((data:any) => {
        console.log("commons: ",data.data());
       
        resolve(data.data());
      }, error => {
        reject(error);
      });
    });
  }
  public getMyReviews(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('reviews', ref => ref.where('id', '==', id)).get().subscribe(async (review) => {
        let data = review.docs.map((element) => {
          let item = element.data() as any;
          item.id = element.id;
          if (item && item.vid) {
            item.vid.get().then(function (doc) {
              item.vid = doc.data();
            });
          }

          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  public getMyProfile(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users').doc(id).get().subscribe((users: any) => {
        resolve(users.data());
      }, error => {
        reject(error);
      });
    });
  }
 
  public create(collection: string,informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection(collection).doc(informations.uid).set(informations).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
  public currentDate(): string{
    const timestamp = Date.now();
const date = new Date(timestamp);
console.log(date.toLocaleString());
return date.toLocaleString();
  }
  public register(emails: string, pwd: string, fnames: string,
     lnames: string, imageUrl: string, type: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(emails, pwd)
        .then(res => {
          if (res.user) {
            this.adb.collection('users').doc(res.user.uid).set({
              uid: res.user.uid,
              email: emails,
              fname: fnames,
              lname: lnames,
              fullname: fnames + ' ' + lnames,
              type: type,
              coverImage: imageUrl,
              status: 'active',
              isLogged: false,
              activity:  firebase.firestore.FieldValue.serverTimestamp()
            });
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch(err => {

          this.authInfo$.next(BackendService.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }
  public checkEmail(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.fetchSignInMethodsForEmail(email).then((info: any) => {
        resolve(info);
      }).catch(error => {
        reject(error);
      });
    });
  }
  public getRestReview(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('reviews', ref => ref.where('restId', '==', id)).get().subscribe(async (review) => {
        let data = review.docs.map((element) => {
          let item = element.data() as any;
          item.id = element.id;
          if (item && item.uid) {
            item.uid.get().then(function (doc:any) {
              item.uid = doc.data();
            });
          }
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  public getRestOrders(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('orders', ref => ref.where('restId', '==', id)).get().subscribe((venue) => {
        let data = venue.docs.map(element => {
          let item = element.data() as any;
          item.uid.get().then(function (doc) {
            item.uid = doc.data();
            item.uid.id = doc.id;
          });
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  public getVenueDetails(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('venue').doc(id).get().subscribe((venue: any) => {
        resolve(venue.data());
      }, error => {
        reject(error);
      });
    });
  }
  public updateProfile(uid, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users').doc(uid).update(param).then((data) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }
  public updateVenue(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('venue').doc(informations.uid).update(informations).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
  public updateCity(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('cities').doc(informations.id).update(informations).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
  public deleteCity(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('cities').doc(informations.id).delete().then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
  public addCity(id, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('cities').doc(id).set(param).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }
  getCities(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('cities').get().subscribe((venue: any) => {
        let data = venue.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  getCurrecySymbol() {
    return environment.general.symbol;
  }
  getAllOrders() : Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('orders').get().subscribe((orders) => {
        let data = orders.docs.map(element => {
          let item = element.data() as any;
          item.id = element.id;
          item.vid.get().then(function (doc) {
            item.vid = doc.data();
            item.vid.id = doc.id;
          });
          item.uid.get().then(function (doc) {
            item.uid = doc.data();
            item.uid.id = doc.id;
          });
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  getSingleVenues(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('venue', ref => ref.where('email', '==', email))
        // .limit(1)
        .get()
        .subscribe((querySnapshot) => {
          if (querySnapshot.empty) {
            reject('No venue found with the provided email.');
          } else {
            const venue = querySnapshot.docs[0].data();
            console.log(venue);
            resolve(venue);
          }
        }, error => {
          reject(error);
        });
    });
  }
  getVenues(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('venue').get().subscribe((venue) => {
        let data = venue.docs.map(element => {
          let item = element.data() as any;
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  getSupplies(restaurantId: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('supply',(ref:any) => ref.where('restaurant.uid', '==', restaurantId)).get().subscribe((venue) => {
      // this.adb.collection('supply').get().subscribe((venue) => {
        let data = venue.docs.map(element => {
          let item = element.data() as any;
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  public getAdmin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users', (ref:any) => ref.where('type', '==', 'admin')).get().subscribe(async (review:any) => {
        console.log(review);
        let data = review.docs.map((element:any) => {
          let item = element.data() as any;
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, (error:any) => {
        reject(error);
      });
    });
  }
  public getSpecificItems(collection:string,column: string,value:string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection(collection, (ref:any) => ref.where(column, '==', value).limit(10)).get().subscribe(async (review:any) => {
        console.log(review);
        let data = review.docs.map((element:any) => {
          let item = element.data() as any;
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, (error:any) => {
        reject(error);
      });
    });
  }
  public createAdminProfile(emails: string, pwd: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(emails, pwd)
        .then(res => {
          console.log("userResponse",res);
          if (res.user) {
            this.adb.collection('users').doc(res.user.uid).set({
              uid: res.user.uid,
              email: emails,
              fname: 'Admin',
              lname: '',
              fullname: 'Admin',
              type: 'admin',
              status: 'active',
              coverImage: 'assets/images/user.png',
              isLogged: false,
              activity:  firebase.firestore.FieldValue.serverTimestamp()
            });
           
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch((err:any) => {

          this.authInfo$.next(BackendService.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }
  public getUsers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users').get().subscribe((users) => {
        let data = users.docs.map(element => {
          let item = element.data() as any;
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
  public checkAuth() {
    return new Promise((resolve, reject) => {
      this.fireAuth.onAuthStateChanged(user => {
        console.log(user);
        if (user != null) {
          localStorage.setItem('uid', user.uid);
          resolve(user);
        } else {
          this.logout();
          localStorage.clear();
          resolve(false);
        }
      });
    });
  }
  public logout(): Promise<void> {
    this.authInfo$.next(BackendService.UNKNOWN_USER);
    
    // this.db.collection('users').doc(localStorage.getItem('uid')).update({ "fcm_token": firebase.firestore.FieldValue.delete() })
    return this.fireAuth.signOut();
  }
  public getProfile(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users').doc(id).get().subscribe((profile: any) => {
        resolve(profile.data());
      }, error => {
        reject(error);
      });
    });
  }
  public login(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log("userResponse",res);
          if (res.user) {
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch(err => {

          this.authInfo$.next(BackendService.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }
}
