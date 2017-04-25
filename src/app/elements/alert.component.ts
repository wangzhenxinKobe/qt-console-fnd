/**
 * Created by gavin on 2017/4/25.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'app-alert',
    template: `
    
    <div class="r_tips r_danger" id="danger"><i class="icon fa fa-close"></i> 提交失败！</div>
    
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

}
