import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Subject }    from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private loginStatusSource = new Subject<boolean>();

  loginStatus$ = this.loginStatusSource.asObservable();

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http ) { }

  sendLoginStatus(status : boolean) {

    this.loginStatusSource.next(status);

  }

  getUser() {

    this.sendLoginStatus(true);

  }

  // 登陆
  login(account:string, password:string) {

    this.sendLoginStatus(true);

/*
    return this.http.post(this.url_authLogin,
      JSON.stringify({account:account,password:password}))
      .toPromise()
      .then(response => response.json().data as User  )
      .catch(this.handleError);
*/

  }

  // 注销
  logout(userId: string) {

/*
    return this.http.post(this.url_authLogout,
      JSON.stringify({userId:userId}), {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
*/
  }

  private handleError(error: any): Promise<any> {
    console.error('发生错误', error);
    return Promise.reject(error.message || error);
  }

}
