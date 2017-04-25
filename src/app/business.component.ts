/**
 * Created by gavin on 2017/4/21.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'app-business',
    template: `
    <div class=" ">
      <div class="wrapper">
        <app-navbar></app-navbar>
        <div class="content-wrapper">
            <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    `
})

export class BusinessComponent {
}
