import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authServ: AngularFireAuth,
    private snack: CommonService
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    try {
      let local_user = JSON.parse(localStorage.getItem('user_data'));
      console.log("local_user", local_user);

      if (!local_user) {
        console.log("local_user1"); 0
        this.snack.openSnackBarAction(
          'You must be logged In!!! Login Please',
          'auth'
        );
      } else if (this.snack.isTokenExpired(local_user.token)) {
        console.log("local_user2")
        this.snack.openSnackBarAction(
          'You must be logged In!!! Login Please',
          'auth'
        );
      }
      else {
        console.log("local_user3")
        if (local_user.user.type != 'admin') {
          this.snack.openSnackBar(
            'Welcome Back ' + local_user.user.email
            // 'dashboard'
          );
        }
      }
      return local_user;
    } catch (error) {
      console.error('An error occurred:', error);
      this.snack.openSnackBarAction(
        'An error occurred while checking authentication. Please try again later.',
        'auth'
      );
      return false;
    }
  }
}
