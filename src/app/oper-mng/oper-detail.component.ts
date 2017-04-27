import {Component, ViewChild, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {AlertComponent} from "../elements/alert.component";
import {OperMngService} from "./opermng.service";

declare var $ : any;

@Component({
  selector: 'app-oper-detail',
  templateUrl: './oper-detail.component.html'
})

export class OperDetailComponent implements OnInit {

  @ViewChild(AlertComponent)
  private readonly alert:AlertComponent;

  title:string;

  isAdd : boolean;

  constructor(
    private operService : OperMngService,
    private route : ActivatedRoute,
    private location : Location,
    private router : Router
  ) {}

  ngOnInit() {


  }

  goback() {

    this.location.back();

  }

}
