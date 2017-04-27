import {Component, ViewChild} from '@angular/core';
import {AlertComponent} from "../elements/alert.component";
import {LoadingComponent} from "../elements/loading.component";

@Component({})
export class BaseComponent {

  @ViewChild(AlertComponent)
  protected readonly alert : AlertComponent;

  @ViewChild(LoadingComponent)
  protected readonly loading : LoadingComponent;

  constructor() {}

  asyncLoad( runner : ()=> Promise<boolean>) {

    let i = 0;

    this.loading.show();

    let interval = setInterval(() => {

      console.info(`------i am in loading for [${i}] times`);

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

    }, 1000);

  }

}
