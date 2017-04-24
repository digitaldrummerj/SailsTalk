import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class IsLoggedOutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    let isLoggedOut = new Observable<boolean>(observer => {
      this.authService.isAuthenticated()
        .subscribe((res: boolean) => {
          if (res) {
            this.router.navigate(['/']);
            observer.next(false);
            observer.complete();
          } else {
            observer.next(true);
            observer.complete();
          }
        }, error => {
          observer.next(true);
          observer.complete();
        });
    });

    return isLoggedOut;
  }
}
