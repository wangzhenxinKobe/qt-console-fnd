import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from "./common/auth.service";
import {UserService} from "./user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private authService : AuthService,
    private userService : UserService,
    private router : Router
  ) {

    console.info("AppComponent ----- in constructor() ");

    authService.loginStatus$.subscribe( status => {

      console.info(`AppComponent ---- login status [${status}]`);

      if(!status) { //登出或者Token失效

        this.router.navigate(['/login']);

      }

    });

  }


  ngOnInit() {

    console.info("AppComponent ----- in ngOnInit() ");

    if(!!this.userService.getUser()) { //用户信息为空

      this.router.navigate(['/login']);

    }

  }

}
