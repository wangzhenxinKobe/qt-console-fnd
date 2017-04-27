/**
 * Created by gavin on 2017/4/27.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'app-loading',
    template: `
    
    <div class="loadingMask" *ngIf="bShowing">
      <div class="loadingBox">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           <span></span>
      </div>
    </div>
    
    `,
    styles: [`
    
    .loadingMask{
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(0,0,0,0.6);
			z-index: 999999;
		}
		.loadingBox{
            width: 150px;
            height: 15px;
            margin: -7.5px 0 0 -75px;
            position: absolute;
            left: 50%;
            top: 50%;
            text-align: center;
        }
        .loadingBox span{
            display: inline-block;
            width: 15px;
            height: 100%;
            margin-right: 5px;
            background: #fff;
            -webkit-animation: load 1.04s ease infinite;
        }
        .loadingBox span:last-child{
            margin-right: 0px; 
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
            }
            100%{
                opacity: 0;
            }
        }
        .loadingBox span:nth-child(1){
            -webkit-animation-delay:0.13s;
        }
        .loadingBox span:nth-child(2){
            -webkit-animation-delay:0.26s;
        }
        .loadingBox span:nth-child(3){
            -webkit-animation-delay:0.39s;
        }
        .loadingBox span:nth-child(4){
            -webkit-animation-delay:0.52s;
        }
        .loadingBox span:nth-child(5){
            -webkit-animation-delay:0.65s;
        }
    
    `]
})

export class LoadingComponent {

  bShowing : boolean = false;

  show() {

    this.bShowing = true;

  }

  hide() {

    this.bShowing = false;

  }

}
