import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AuthService {

  private loginStatusSource = new Subject<boolean>();

  loginStatus$ = this.loginStatusSource.asObservable();
  
  isLogedIn : boolean = false;

  sendLoginStatus(status : boolean) {

    this.isLogedIn = status;
    this.loginStatusSource.next(status);

  }


}
