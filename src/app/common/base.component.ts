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



}
