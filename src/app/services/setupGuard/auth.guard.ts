import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class SetupAuthGuard implements CanActivate {

  constructor(private authServ: BackendService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authServ.getAdmin().then((user):any => {
      if (user && user.length > 0) {
        return true;
      } else {
        this.router.navigate(['/setup']);
      }
    });
  }
}
