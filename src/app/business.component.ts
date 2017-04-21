/**
 * Created by gavin on 2017/4/21.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'app-business',
    template: `
    
    <body class="hold-transition skin-blue sidebar-mini">
      <div class="wrapper">
        <app-navbar></app-navbar>
        <div class="content-wrapper">
            <router-outlet></router-outlet>
        </div>
      </div>
    </body>
    
    `
})

export class BusinessComponent {
}
