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

// if($("#vcode").val() == ""){
//   this.alert.error("请输入验证码");
// }
//
//     //登陆验证
//     var userId = $("#userId");
    // var password = $("#password");
//     var code = $("#code");
    // var msg = "";
//     if ($.trim(userId.val()) == ""){
//       msg = "用户名不能为空！";
//
//     }else if (!/^\d{4,6}$/.test($.trim(userId.val()))){
//       msg = "用户名格式不正确！";
//
//     }else
// if ($.trim(password.val()) == ""){
//       msg = "密码不能为空！";
//
//     }else if (!/^\w{6}$/.test($.trim(password.val()))){
//       msg = "密码格式不正确！";
//
//     }else if ($.trim(code.val()) == ""){
//       msg = "验证码不能为空！";
//
//     }else if (!/^[0-9a-zA-Z]{4}$/.test($.trim(code.val()))){
//       msg = "验证码格式不正确！";
//
//     }
//     if (msg != ""){
//       this.alert.error(msg);
//     }

     if( !this.password ) return ;

    let pwdMd5 = Md5.hashStr(this.password).toString();

    this.userService.login(this.userNo, pwdMd5, this.chkCode)
      .then( res => {

        if(res[0]) {
          this.router.navigate(['/business']);
        } else {
           console.info(res)
          this.alert.error(res[1]);
        }

      })
      .catch( error => this.alert.error(error));

  }

}
