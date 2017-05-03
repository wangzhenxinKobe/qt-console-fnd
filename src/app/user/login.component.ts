import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {Md5} from "ts-md5/dist/md5";

import {UserService} from "./user.service";
import {AlertComponent} from "../elements/alert.component";
import {BaseComponent} from "../common/base.component";

declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  chkCodeRequest : string;

  password : string = '';
  userNo : string = '';
  chkCode : string = '';

  constructor(
    private userService : UserService,
    private router : Router
  ) { super(); }

  ngOnInit() {

    var boxH = $('.login-box').height()/2;
    $('.login-box').css({'marginTop':-boxH});

    this.updateChkCode();

  }

  updateChkCode() {

    this.chkCodeRequest = this.userService.getChkCodeRequest();

  }

  onLogin() {

    if( !this.password ) return ;

    let pwdMd5 = Md5.hashStr(this.password).toString();

    this.userService.login(this.userNo, pwdMd5, this.chkCode)
      .then( res => {

        if(res[0]) {
          this.router.navigate(['/business']);
        } else {
          this.alert.error(res[1]);
        }

      })
      .catch( error => this.alert.error(error));

  }

}
