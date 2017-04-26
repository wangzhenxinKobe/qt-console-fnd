/**
 * Created by gavin on 2017/4/25.
 */

import {Component} from '@angular/core';

declare var $ : any;

@Component({
  selector: 'app-alert',
  template: `
    
    <div class="{{ styles[typeIndex].type }}" id="alert-win">
       <i class="{{ styles[typeIndex].icon }}"></i> {{message}}
       <button type="button" (click)="close()" class="close"><span >&times;</span></button>
    </div>
    
    `,
  styles:[`
    
  .r_tips{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
    color: #fff;
    line-height: 150%;
    padding:  10px;
    z-index: 99;
    display: none;	 
  }
  .r_tips i{
    font-size: 18px;
    vertical-align: middle;
    margin: -3px 0 0 0;
  }
  .r_danger{
	  background: rgba(221,75,57,0.9);
  }
  .r_warning{
	  background: rgba(243,156,18,0.9);
  }
  .r_success{
	  background: rgba(0,192,239,0.9);
  }
  
  `]
})

export class AlertComponent {

  styles = [
    {
      icon : 'icon fa fa-check',
      type : 'r_tips r_success'
    },
    {
      icon : 'icon fa fa-warning',
      type : 'r_tips r_warning'
    },
    {
      icon : 'icon fa fa-close',
      type : 'r_tips r_danger'
    }
  ];

  typeIndex : number = 0;
  message : string = 'hello word';

  error(msg : string) {

    this.message = msg;
    this.typeIndex = 2;
    this.showMe();

  }

  warn(msg : string) {

    this.message = msg;
    this.typeIndex = 1;
    this.showMe();

  }

  info(msg : string) {

    this.message = msg;
    this.typeIndex = 0;
    this.showMe();

  }

  close() {

    $('#alert-win').slideUp(400);

  }

  private showMe() {

    $('#alert-win').slideDown(400);

  }

}
