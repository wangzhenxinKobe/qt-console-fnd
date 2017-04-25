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
var tplatform_1 = require("./tplatform");
var param_config_1 = require("../common/param.config");
var TplatformService = (function () {
    function TplatformService(http) {
        this.http = http;
        this.hostUrl = 'http://192.168.0.18/handler'; //URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.requestId = '';
    }
    //交易平台查询
    TplatformService.prototype.getTplatformPage = function (deploySite, currentPage) {
        var request = JSON.stringify({
            deploySite: deploySite,
            pageSize: param_config_1.ParamConfig.DATA_LIST_PAGE_SIZE,
            currentPage: currentPage,
            requestId: this.requestId,
            serviceCode: 'FS057'
        });
        return this.http
            .post(this.hostUrl, request, { headers: this.headers })
            .toPromise()
            .then(this.extractTpatformPage)
            .catch(this.handleError);
    };
    TplatformService.prototype.extractTpatformPage = function (res) {
        console.info(res);
        var body = res.json();
        if (body.errCode == '000000') {
            var pagedata = new tplatform_1.TplatformPage();
            pagedata.tplatform = body.fieldList;
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
    TplatformService.prototype.addFutures = function (tplatform) {
        var request = JSON.stringify({
            platId: tplatform.platId,
            ip: tplatform.ip,
            port: tplatform.port,
            deploySite: tplatform.deploySite,
            comment: tplatform.comment,
            serviceCode: 'FS058'
        });
        return this.http
            .post(this.hostUrl, request, { headers: this.headers })
            .toPromise()
            .then(function (res) {
            var body = res.json();
            if (body.errCode == '000000') {
                return true;
            }
            else {
                console.error("请求失败：" + body.errMsg);
                return false;
            }
        })
            .catch(this.handleError);
    };
    //修改
    TplatformService.prototype.updateFutures = function (tplatform) {
        var request = JSON.stringify({
            platId: tplatform.platId,
            ip: tplatform.ip,
            port: tplatform.port,
            deploySite: tplatform.deploySite,
            comment: tplatform.comment,
            serviceCode: 'FS060'
        });
        return this.http
            .post(this.hostUrl, request, { headers: this.headers })
            .toPromise()
            .then(function (res) {
            console.info(res);
            var body = res.json();
            if (body.errCode == '000000') {
                return true;
            }
            else {
                console.error("请求失败：" + body.errMsg);
                return false;
            }
        })
            .catch(this.handleError);
    };
    //删除
    TplatformService.prototype.removeFutures = function (tplatform) {
        var request = JSON.stringify({
            platId: tplatform.platId,
            serviceCode: 'FS061'
        });
        return this.http
            .post(this.hostUrl, request, { headers: this.headers })
            .toPromise()
            .then(this.addFuturesData)
            .catch(this.handleError);
    };
    //删除返回结果
    TplatformService.prototype.removeFuturesData = function (res) {
        console.info(res);
        var body = res.json();
        if (body.errCode == '000000') {
            console.info("请求成功");
            return Promise[true, ""];
        }
        else {
            console.error("请求失败：" + body.errMsg);
            return null;
        }
    };
    TplatformService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    TplatformService = __decorate([
        core_1.Injectable()
    ], TplatformService);
    return TplatformService;
}());
exports.TplatformService = TplatformService;
