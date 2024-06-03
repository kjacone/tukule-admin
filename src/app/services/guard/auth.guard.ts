import { inject,Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,UrlTree,
} from '@angular/router';


import { Observable,switchMap,of} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Auth, user } from '@angular/fire/auth';
import { doc, docData, DocumentReference, Firestore, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);

 


constructor( private router: Router) {
  
 }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    

    return user(this.auth).pipe(
    take(1),
    switchMap(user => {
      
      const isAuthenticated = !!user;
      if (!isAuthenticated) {
        console.log('not authenticated');
        this.router.navigate(['auth']);
        return of(false);
      }

      // const userDoc: DocumentReference<DocumentData> = doc(this.firestore, 'users', user.uid);
      // return docData(userDoc).pipe(
      //   take(1),
      //   map((userData: any) => {
      //     console.log(' authenticated',userData);
      //     const isAdmin = userData.type === 'admin';
      //     if (isAdmin) {
      //       this.router.navigate(['admin-dashboard']);
      //     }else{
      //       this.router.navigate(['dashboard']);
      //     }
      //     return !!user;
      //   })
      // );
      return of(true);
    })
  );
}
}