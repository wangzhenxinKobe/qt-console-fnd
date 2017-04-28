import {Component, ViewChild} from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import {AlertComponent} from "../elements/alert.component";
import {LoadingComponent} from "../elements/loading.component";
import {ParamConfig} from "./param.config";

@Component({})
export class BaseComponent {

  @ViewChild(AlertComponent)
  protected readonly alert : AlertComponent;

  @ViewChild(LoadingComponent)
  protected readonly loading : LoadingComponent;

  constructor() {}

  protected asyncTimer( runner : ()=> Promise<boolean>) {

    let i = 0;

    let interval = setInterval(() => {

      console.info(`------i am in loading for the [${i}]th times`);

      if(i >= 3) {
        this.loading.hide();
        clearInterval(interval);
      }
      runner().then(res => {

        if(res) {

          this.loading.hide();
          clearInterval(interval);

        }
      });

      i++;

    }, 2000);

  }

}
