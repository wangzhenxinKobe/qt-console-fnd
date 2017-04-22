import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from "./common/auth.service";
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

    if(!this.userService.getUser()) { //用户信息为空

      this.setBodyClass(true);
      this.router.navigate(['/login']);

    }

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
