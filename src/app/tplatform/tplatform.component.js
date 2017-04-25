"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var TplatformComponent = (function () {
    function TplatformComponent(tplatformService) {
        this.tplatformService = tplatformService;
        this.searchPlatId = '';
        this.curPage = 1;
        this.editorTitle = '';
    }
    TplatformComponent.prototype.ngOnInit = function () {
        this.curTplatform = {
            platId: 0,
            ip: "",
            port: 0,
            deploySite: "",
            comment: ""
        };
    };
    TplatformComponent.prototype.search = function () {
        this.curPage = 1;
        this.queryList();
    };
    TplatformComponent.prototype.onPage = function (event) {
        this.curPage = event;
        this.queryList();
    };
    TplatformComponent.prototype.onAddMdService = function () {
        this.isAddEditor = true;
        this.editorTitle = '新增柜台系统';
        this.curTplatform = {
            platId: 0,
            ip: "",
            port: 0,
            deploySite: "",
            comment: ""
        };
        $('#data_editor').modal('show'); //显示编辑对话框
    };
    TplatformComponent.prototype.onEditTplatform = function (value) {
        this.isAddEditor = false;
        this.editorTitle = '编辑柜台系统';
        this.curTplatform = value;
        $('#data_editor').modal('show'); //显示编辑对话框
    };
    TplatformComponent.prototype.onDeleteTplatform = function (value) {
        this.curTplatform = value;
        $('#delete_confirm').modal('show'); //显示编辑对话框
    };
    TplatformComponent.prototype.save = function () {
        var _this = this;
        if (this.isAddEditor) {
            this.curPage = 1;
            this.tplatformService.addTplatform(this.curTplatform)
                .then(function (result) { return result ? _this.queryList() : alert("数据新增失败，请重试！"); });
        }
        else {
            this.tplatformService.updateTplatform(this.curTplatform)
                .then(function (result) { return result ? _this.queryList() : alert("数据修改失败，请重试！"); });
        }
        $('#data_editor').modal('hide');
    };
    TplatformComponent.prototype.delete = function () {
        var _this = this;
        this.tplatformService.removeTplatform(this.curTplatform)
            .then(function (result) { return result ? _this.queryList() : alert("数据删除失败，请重试！"); });
        $('#delete_confirm').modal('hide');
    };
    TplatformComponent.prototype.queryList = function () {
        var _this = this;
        console.info("searchPlatId[" + this.searchPlatId + "], curPage[" + this.curPage + "]");
        this.tplatformService.getTplatformPage(this.searchPlatId, this.curPage)
            .then(function (page) { return _this.tplatformPage = page; });
    };
    TplatformComponent = __decorate([
        core_1.Component({
            selector: 'app-tplatform',
            templateUrl: './tplatform.component.html',
            styleUrls: ['./tplatform.component.css']
        })
    ], TplatformComponent);
    return TplatformComponent;
}());
exports.TplatformComponent = TplatformComponent;
