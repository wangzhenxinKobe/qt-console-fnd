/**
 * 分页按钮组件
 *
 */

import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-pagination',
    template: `
    
        <div class="r_paging">
          <div class="dataTables_paginate paging_simple_numbers"  >
            <ul class="pagination">
              <li class="paginate_button previous" *ngIf="totalPages > 1" [class.disabled]="currentPage == 1">
                <a (click)="currentPage != 1 ? onPreviousPage() : ''" style="cursor: pointer">上一页</a>
              </li>
              <li class="paginate_button " *ngFor="let page of pages" [class.active]="page == currentPage">
                <a (click)="page != currentPage ? onPage(page) : ''" style="cursor: pointer">{{page}}</a>
              </li>
              <li class="paginate_button next" *ngIf="totalPages > 1" [class.disabled]="currentPage == totalPages">
                <a (click)="currentPage != totalPages ? onNextPage() : '' " style="cursor: pointer">下一页</a>
              </li>
            </ul>
          </div>
        </div>
   
    `
})

export class PaginationComponent implements OnChanges {

  @Input() currentPage : number;
  @Input() totalPages : number;
  @Output() clickPage : EventEmitter<any> = new EventEmitter();

  pages : number[] = [];


  ngOnChanges(changes : SimpleChanges) {

    for(let propName in changes) {

      if(propName == 'totalPages') {


        let chng = changes[propName];

        this.pages = [];
        for(let i = 0; i < chng.currentValue; i++) {
          this.pages[i] = i + 1;
        }
        break;

      }

    }

  }

  onPage(page) {

    this.currentPage = page;
    this.clickPage.emit(this.currentPage);

  }

  onPreviousPage() {

    this.currentPage--;
    this.clickPage.emit(this.currentPage);

  }

  onNextPage() {

    this.currentPage++;
    this.clickPage.emit(this.currentPage);

  }


}
