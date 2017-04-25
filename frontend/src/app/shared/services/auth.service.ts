import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { IUser } from '../classes/user';

let todoUrl = environment.apiBaseUrl + '/user';
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
    return this.http.put(todoUrl + '/login', JSON.stringify(loginInfo), options)
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

  signup(email: string, password: string) {
    let loginInfo = { "email": email, "password": password };
    return this.http.post(todoUrl, JSON.stringify(loginInfo), options)
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

  updateCurrentUser(firstName: string, lastName: string) {
    let profileInfo = { "firstName": firstName, "lastName": lastName };
    let id = this.currentUser.id;
    return this.http.put(todoUrl + '/' + id, profileInfo, options)
      .do(result => {
        if (result) {
          this.currentUser = <IUser>result.json();
        }
      })
      .catch(error => {
        console.log('login error', error)
        return Observable.of(false);
      });
  }

  hasUser(): boolean {
    return !!this.currentUser;
  }

  getIdentity(): Observable<IUser> {
    return this.http.get(todoUrl + '/identity', options)
      .map((res: Response) => {
        if (res) {
          this.currentUser = <IUser>res.json();

          return this.currentUser;
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

    return this.http.get(todoUrl + '/identity', options)
      .map((res: Response) => {
        if (res) {
          this.currentUser = <IUser>res.json();
          return Observable.of(true)
        }

        this.currentUser = undefined;
        return Observable.of(false)
      })
      .catch(error => Observable.of(false));
  }


  logout(): Observable<boolean> {
    return this.http.get(todoUrl + '/logout', options)
      .map((res: Response) => {
        if (res.ok) {
          this.currentUser = undefined;
          return Observable.of(true);
        }

        return Observable.of(false);
      })
      .catch(error => this.handleError(error));
  }
}
