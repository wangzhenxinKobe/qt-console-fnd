import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../user/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  authorities : any = null;

  selectedParent : any;
  selectedRouter : any;

  constructor(
    private router : Router,
    private authService : AuthService
  ) {

    this.authorities = this.authService.authorities;

    if(!!this.authorities) {
      this.selectedParent = this.authorities[0];
      this.selectedRouter = this.selectedParent.children[0];
    }

  }

  ngOnInit() {

    if(!!this.selectedRouter)
      this.router.navigate([this.selectedRouter.url]);

  }

  OnSelect(child, parent) {

    this.selectedRouter = child;
    this.selectedParent = parent;

  }

}
