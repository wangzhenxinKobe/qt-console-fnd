import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import {UserService} from "./user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() success : EventEmitter<any> = new EventEmitter();

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onLogin() {

    this.userService.login('', '', '');
    this.router.navigate(['/business']);

  }

}
