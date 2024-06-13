import { Injectable, inject } from '@angular/core';

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
import {
  map,
  switchMap,
  firstValueFrom,
  filter,
  BehaviorSubject,
  Observable,
  Subscription,
} from 'rxjs';
import {
  doc,
  docData,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  collectionData,
  Timestamp,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  DocumentData,
  FieldValue,
  where,
  FieldPath,
  getDocs,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/services/models/models';
import { v4 as uuid } from 'uuid';
import { environment } from '../../environments/environment';
export class AuthInfo {
  constructor(public $uid: string) {}

  isLoggedIn() {
    return !!this.$uid;
  }
}
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  static UNKNOWN_USER = new AuthInfo('');
  public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(
    BackendService.UNKNOWN_USER
  );

  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  storage: Storage = inject(Storage);
  messaging: Messaging = inject(Messaging);
  router: Router = inject(Router);
  private provider = new GoogleAuthProvider();

  // observable that is updated when the auth state changes
  user$ = user(this.auth);
  currentUser: User | null = this.auth.currentUser;
  userSubscription: Subscription;
  constructor() {}

  getFirebaseDataMultiple = (
    collectionName: string,
    limitNo: number,
    row: string,
    rowValue: string,
    row1: string,
    rowValue1: string
  ) => {
    let dataQuery = query(
      collection(this.firestore, collectionName),
      // orderBy('uid', 'desc'),
      where(row, '==', rowValue),
      where(row1, '==', rowValue1),
      limit(limitNo)
    );

    return collectionData(dataQuery);
  };

  getFirebaseData = (
    collectionName: string,
    limitNo: number,
    row: string,
    rowValue: string
  ) => {
    let dataQuery = query(
      collection(this.firestore, collectionName),
      // orderBy('uid', 'desc'),
      where(row, '==', rowValue),
      limit(limitNo)
    );

    return collectionData(dataQuery);
  };

  getSingleFirebaseDocument = (
    collectionName: string,
    fieldName: string,
    fieldValue: string
  ) => {
    let dataQuery = query(
      collection(this.firestore, collectionName),
      where(fieldName, '==', fieldValue)
    );

    return getDocs(dataQuery).then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No matching documents found.');
        return null;
      } else {
        return querySnapshot.docs[0].data();
      }
    });
  };

  getAllData = (collectionName: string, limitNo: number) => {
    let dataQuery = query(
      collection(this.firestore, collectionName),
      // orderBy('timestamp', 'desc'),
      limit(limitNo)
    );

    return collectionData(dataQuery);
  };

  createCollection = async (
    collectionName,
    collectionData
  ): Promise<void | DocumentReference<DocumentData>> => {
    try {
      collectionData.uid = uuid();
      const newDataRef = await addDoc(
        collection(this.firestore, collectionName),
        collectionData
      );
      return newDataRef;
    } catch (error) {
      console.error('Error writing new message to Firebase Database', error);
      return;
    }
  };

  updateDocument = async (
    collectionName: string,
    documentId: string,
    documentData: DocumentData
  )=> {
    try {
      const docRef = doc(this.firestore, collectionName, documentId);
      await updateDoc(docRef, documentData);
    } catch (error) {
      console.error('Error updating document', error);
      throw error;
    }
  };

  deleteDocument = async (
    collectionName: string,
    documentId: string
  ) => {
    try {
      const docRef = doc(this.firestore, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document', error);
      throw error;
    }
  };

  getDocumentByUID = async (collectionName: string, uid: string) => {
    try {
      const docRef = doc(this.firestore, collectionName, uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data: any = docSnap.data();
        data.id = docSnap.id;
        return data;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.log('Error getting document:', error);
      return null;
    }
  };

  getFoods = (id: string) => {
    return this.getFirebaseData('foods', 10, 'restaurant.uid', id);
  };
  public createDriver = async (driver:AppUser) => {
    return this.createUser(driver);
  };

  createUser = async (driver:AppUser)  => {
    return this.createCollection('users', driver);
  };

  public getMyOrders = (id) => {
    return this.getFirebaseData('orders', 10, 'restaurantId', id);
  };
  public getMyAddress = (uid: any) => {
    return this.getDocumentByUID('address', uid);
  };
  public getCommons = () => {
    return this.getDocumentByUID('commons', 'app');
  };
  public getMyReviews = (id) => {
    return this.getFirebaseData('reviews', 10, 'id', id);
  };
  public getMyProfile = (id) => {
    return this.getDocumentByUID('users', id);
  };

  public create = async (
    collection: string,
    informations: any
  ) => {
    return this.createCollection(collection, informations);
  };

  public currentDate(): string {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    console.log(date.toLocaleString());
    return date.toLocaleString();
  }

  public register = async (user:AppUser)  => {
    return this.createUser(user);
  };

  public checkEmail(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {});
  }

  public getRestReview = (id) => {
    return this.getFirebaseData('reviews', 10, 'restId', id);
  };

  public getRestOrders = (id) => {
    return this.getFirebaseData('orders', 10, 'restId', id);
  };

  public getVenueDetails = (id) => {
    return this.getDocumentByUID('venue', id);
  };

  public updateProfile = async (uid, param) => {
    return this.updateDocument('users', uid, param);
  };
  public updateVenue = async (informations: any) => {
    return this.updateDocument('venue', informations.id, informations);
  };
  public updateCity = async (informations: any) => {
    return this.updateDocument('cities', informations.id, informations);
  };
  public deleteCity = async (informations: any) => {
    return this.deleteDocument('cities', informations.id);
  };
  public addCity = async (param) => {
    return this.createCollection('cities', param);
  };

  getCities = () => {
    return this.getAllData('cities', 10);
  };

  getCurrecySymbol() {
    return environment.general.symbol;
  }

  getAllOrders = () => {
    return this.getAllData('orders', 10);
  };

  getSingleVenues = (email: string) => {
    console.log('get venue for email: ', email);
    return this.getSingleFirebaseDocument('venue', 'email', email);
  };

  getVenues = () => {
    return this.getAllData('venue', 10);
  };

  getSupplies = (restaurantId: string) => {
    return this.getFirebaseData('supply', 10, 'restId', restaurantId);
  };

  public getAdmin = () => {
    return this.getFirebaseData('users', 10, 'type', 'admin');
  };

  public getSpecificItems =  (
    collection: string,
    column: string,
    value: string
  )  => {
    return this.getFirebaseData(collection, 10, column, value);
  };

  public createAdminProfile = async (user:AppUser): Promise<any> => {
    return this.createUser(user);
  };

  public getUsers = () => {
    return this.getFirebaseData('users', 10, 'type', 'owner');
  };

  public checkAuth() {
    return new Promise((resolve, reject) => {
      signInWithPopup(this.auth, this.provider).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      })
    });
  }

  public logout = () => {
    this.logoutWithGoogle();
  };

  public getProfile = (id) => {
    return this.getFirebaseData('users', 10, 'email', id);
  };

  public login = () => {
    this.loginWithGoogle();
  };

  // Signs-in Friendly Chat.
  loginWithGoogle = () => {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.getProfile(result.user.email).subscribe((data: any) => {
        if (data) {
          // this.authInfo$.next(BackendService(data.uid));
          if (data.type === 'admin') {
            this.router.navigate(['admin-dashboard',JSON.stringify(data)]);
          } else {
            this.router.navigate(['dashboard',JSON.stringify(data)]);
          }
        } else {
          //   this.createUser(result.user.email, result.user.uid, result.user.photoURL, result.user.displayName, 'customer').then((data: any) => {
          //     if(data){
          // this.router.navigate(['auth']);
          //     }
          //   })
        }
      });

      return credential;
    });
  }

  // Logout of Friendly Chat.
  logoutWithGoogle() {
    this.authInfo$.next(BackendService.UNKNOWN_USER);
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/', 'auth']);
        console.log('signed out');
      })
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
  }
}
