import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() success : EventEmitter<any> = new EventEmitter();

  constructor(private authSevice : AuthService) { }

  ngOnInit() {
  }

  onLogin() {

    this.authSevice.login('', '');

  }

}
