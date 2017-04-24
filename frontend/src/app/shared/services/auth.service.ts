import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { IUser } from '../classes/user';

let todoUrl = environment.apiBaseUrl;
let options = new RequestOptions({ withCredentials: true });

@Injectable()
export class AuthService {
  public currentUser: IUser;
  public redirectUrl: string;

  constructor(private http: Http) {
  }

  // TODO
  // implement exception handling strategy
  private handleError(error: Response) {
    console.log('error', error);
    return Observable.throw(error.json().error || 'Server error');
  }

  login(email: string, password: string) {
    let loginInfo = { "email": email, "password": password };
    return this.http.put(todoUrl + '/user/login', JSON.stringify(loginInfo), options)
      .do((res: Response) => {
        if (res) {
          this.currentUser = <IUser>res.json();
        }
      })
      .catch(error => {
        console.log('login error', error)
        return Observable.of(false);
      });
  }

  getIdentity(): Observable<IUser> {
    console.log('getIdentity');
    return this.http.get(todoUrl + '/user/identity', options)
      .map((res: Response) => {
        if (res) {
          return <IUser>res.json();
        }

        return Observable.of(null);
      })
      .catch((error: Response) => {
        if (error.status !== 403) {
          return this.handleError(error);
        }

        return Observable.of(null);

      });
  }

  isAuthenticated(): Observable<boolean> {

    return this.http.get(todoUrl + '/user/identity', options)
      .map((res: Response) => {
        if (res) {
          return Observable.of(true)
        }

        this.currentUser = undefined;
        return Observable.of(false)
      })
      .catch(error => Observable.of(false));
  }


}
