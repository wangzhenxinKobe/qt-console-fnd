import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLanded : boolean = true;

  constructor( private authService : AuthService ) {

    authService.loginStatus$.subscribe( status => {
      this.isLanded = status;
      console.info(`isLanded[${status}]`);
    });

  }


  ngOnInit() {

    this.authService.getUser();

  }

}
