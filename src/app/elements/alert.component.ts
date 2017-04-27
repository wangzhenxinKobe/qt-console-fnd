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
    
    `
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

    setTimeout(() => this.close(), 2000);

  }

  warn(msg : string) {

    this.message = msg;
    this.typeIndex = 1;
    this.showMe();

    setTimeout(() => this.close(), 2000);

  }

  info(msg : string) {

    this.message = msg;
    this.typeIndex = 0;
    this.showMe();

    setTimeout(() => this.close(), 1000);

  }

  close() {

    $('#alert-win').slideUp(400);

  }

  private showMe() {

    $('#alert-win').slideDown(400);

  }

}
