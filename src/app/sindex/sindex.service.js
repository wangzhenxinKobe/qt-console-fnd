"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var sindex_1 = require("./sindex");
var SindexService = (function () {
    function SindexService(http) {
        this.http = http;
        this.hostUrl = 'http://192.168.0.36:8081/handler'; //URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.request_id = '';
    }
    //股票信息查询
    SindexService.prototype.getFutures = function (indexName, pageSize, currentPage) {
        var request = JSON.stringify({
            indexName: indexName,
            pageSize: pageSize,
            currentPage: currentPage,
            requestId: this.request_id,
            serviceCode: 'FS012'
        });
        return this.http
            .post(this.hostUrl, request, { headers: this.headers })
            .toPromise()
            .then(this.extractFuturesData)
            .catch(this.handleError);
    };
    SindexService.prototype.extractFuturesData = function (res) {
        console.info(res);
        var body = res.json();
        if (body.errCode == '000000') {
            var pagedata = new sindex_1.Sindexpage();
            pagedata.sindex = body.fieldList;
            pagedata.totalPages = body.totalPages;
            pagedata.totalRows = body.totalRows;
            return pagedata;
        }
        else {
            console.error("请求失败：" + body.errMsg);
            return null;
        }
    };
    //增加
    // addFutures(binfo : Binfo) : Promise<[boolean ,string]> {
    //
    //
    //   let request = JSON.stringify({
    //
    //     exchangeId : binfo.exchangeId,
    //     stockCode : binfo.stockCode,
    //     stockName : binfo.stockName,
    //     stockBoard : binfo.stockBoard,
    //     flowVolume : binfo.flowVolume,
    //     allVolume : binfo.allVolume,
    //     isFund : binfo.isFund,
    //     isIndex : binfo.isIndex,
    //     serviceCode : 'FS013'
    //
    //   });
    //
    //   return this.http
    //     .post(this.hostUrl, request, {headers: this.headers})
    //     .toPromise()
    //     .then(this.addFuturesData)
    //     .catch(this.handleError);
    //
    // }
    //添加返回结果
    // private addFuturesData	(res : Response) : Promise<[boolean ,string]> {
    //
    //   console.info(res);
    //
    //   let body = res.json();
    //
    //   if (body.errCode == '000000') {
    //
    //     console.info("请求成功");
    //
    //     return Promise[true, ""];
    //
    //   } else {
    //
    //     console.error("请求失败：" + body.errMsg);
    //     return null;
    //
    //   }
    //
    //
    // }
    //修改
    // updateFutures(binfo : Binfo) : Promise<[boolean ,string]> {
    //
    //
    //   let request = JSON.stringify({
    //
    //     exchangeId : binfo.exchangeId,
    //     stockCode : binfo.stockCode,
    //     stockName : binfo.stockName,
    //     stockBoard : binfo.stockBoard,
    //     flowVolume : binfo.flowVolume,
    //     allVolume : binfo.allVolume,
    //     isFund : binfo.isFund,
    //     isIndex : binfo.isIndex,
    //     serviceCode : 'FS014'
    //
    //   });
    //   return this.http
    //     .post(this.hostUrl, request, {headers: this.headers})
    //     .toPromise()
    //     .then(this.addFuturesData)
    //     .catch(this.handleError);
    //
    // }
    //修改返回结果
    // private updateFuturesData	(res : Response) : Promise<[boolean ,string]> {
    //
    //   console.info(res);
    //
    //   let body = res.json();
    //
    //   if (body.errCode == '000000') {
    //
    //     console.info("请求成功");
    //
    //     return Promise[true, ""];
    //
    //   } else {
    //
    //     console.error("请求失败：" + body.errMsg);
    //     return null;
    //
    //   }
    // }
    //删除
    // removeFutures(binfo : Binfo) : Promise<[boolean ,string]> {
    //
    //
    //   let request = JSON.stringify({
    //     stockCode : binfo.stockCode,
    //     serviceCode : 'FS009'
    //
    //   });
    //
    //   return this.http
    //     .post(this.hostUrl, request, {headers: this.headers})
    //     .toPromise()
    //     .then(this.addFuturesData)
    //     .catch(this.handleError);
    //
    // }
    //删除返回结果
    // private removeFuturesData	(res : Response) : Promise<[boolean ,string]> {
    //
    //   console.info(res);
    //
    //   let body = res.json();
    //
    //   if (body.errCode == '000000') {
    //
    //     console.info("请求成功");
    //
    //     return Promise[true, ""];
    //
    //   } else {
    //
    //     console.error("请求失败：" + body.errMsg);
    //     return null;
    //
    //   }
    // }
    SindexService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    SindexService = __decorate([
        core_1.Injectable()
    ], SindexService);
    return SindexService;
}());
exports.SindexService = SindexService;
