import {Component, ViewChild} from '@angular/core';

import {AlertComponent} from "../elements/alert.component";
import {LoadingComponent} from "../elements/loading.component";

@Component({
  template: ''
})
export class BaseComponent {

  @ViewChild(AlertComponent)
  public alert : AlertComponent;

  @ViewChild(LoadingComponent)
  public loading : LoadingComponent;

  constructor() {}

  protected asyncTimer( runner : ()=> Promise<boolean>) {

    this.loading.show();

    let i = 0;

    let interval = setInterval(() => {

      console.info(`------i am in loading for the [${i}]th times`);

      if(i > 2) {
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
