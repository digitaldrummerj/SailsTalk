import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class IsSignedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let isLoggedIn = new Observable<boolean>(observer => {
      this.authService.isAuthenticated()
        .subscribe((res: boolean) => {
          if (res) {
            observer.next(true);
            observer.complete();
          } else {
            this.router.navigate(['/login']);
            observer.next(false);
            observer.complete();
          }
        }, error => {
          observer.next(false);
          observer.complete();
        });
    });

    return isLoggedIn;
  }
}
