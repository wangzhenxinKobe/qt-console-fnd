import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Md5} from "ts-md5/dist/md5";

import {UserService} from "./user.service";

declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  chkCodeRequest : string;

  password : string;
  userNo : string;
  chkCode : string;

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit() {

    var boxH = $('.login-box').height()/2;
    $('.login-box').css({'marginTop':-boxH});

    this.updateChkCode();

  }

  updateChkCode() {

    this.chkCodeRequest = this.userService.getChkCodeRequest();

  }

  onLogin() {

    if(this.password == '') return ;

    let pwdMd5 = Md5.hashStr(this.password).toString();

    console.info(`UserName[${this.userNo}], Password[${this.password}], MD5[${pwdMd5}], chkCode[${this.chkCode}]`);

    this.userService.login(this.userNo, pwdMd5, this.chkCode)
      .then( (res : boolean) => {

        if(res) {
          this.router.navigate(['/business']);
        }

      });
    
  }

}
