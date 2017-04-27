import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from "./user/auth.service";
import {UserService} from "./user/user.service";

declare var $ : any;

@Component({
  selector: 'app-root',
  template: ` 
 
      <router-outlet></router-outlet> 
 
    `
})
export class AppComponent implements OnInit{


  constructor(
    private authService : AuthService,
    private userService : UserService,
    private router : Router
  ) {

    authService.loginStatus$.subscribe( status => {

      if(!status) { //登出或者Token失效

        this.setBodyClass(true);
        this.router.navigate(['/login']);

      } else {

        this.setBodyClass(false);

      }

    });

  }


  ngOnInit() {

    this.userService.getUser()
      .then( res => {

        if(res[0]) {

          this.setBodyClass(false);
          this.router.navigate(['/business']);

        } else {

          this.setBodyClass(true);
          this.router.navigate(['/login']);

        }

      })
      .catch( res => {

        this.setBodyClass(true);
        this.router.navigate(['/login']);

      });

  }

  private setBodyClass(isLogin : boolean) {

    $('body').addClass('hold-transition');

    if (isLogin) {

      $('body').removeClass('skin-blue');
      $('body').removeClass('sidebar-mini');
      $('body').addClass('login-page');

    } else {

      $('body').removeClass('login-page');
      $('body').addClass('skin-blue');
      $('body').addClass('sidebar-mini');

    }

  }

}
