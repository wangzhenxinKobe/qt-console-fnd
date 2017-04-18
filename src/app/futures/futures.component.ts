import { Component, OnInit } from '@angular/core';
import {Futures} from "./futures";

declare var $;

@Component({
  selector: 'app-futures',
  templateUrl: './futures.component.html',
  styleUrls: ['./futures.component.css']
})
export class FuturesComponent implements OnInit {

  futuresList : Futures[];


  constructor() { }

  ngOnInit() {


    $(function () {

      $('#futures-table').Tabledit({

        url: 'http://localhost:8080/submit_photos',
        columns: {
          identifier: [0, 'productId'],
          editable: [
            [1, 'productName'],
            [2, 'exchangeId', '{"100001": "交易所代码1", "100002": "交易所代码2", "100003": "交易所代码3"}'],
            [3, 'volumeMultiple'],
            [4, 'priceTick', '{"1": "十万", "2": "百万", "3": "千万"}'],
            [5, 'feeMode', '{"1": "单元制1", "2": "单元制2", "3": "单元制3"}']
          ]
        },

        onAjax: function(action, serialize) { //发送请求前，对请求数据进行预处理

          console.log('onAjax(action, serialize)');
          console.log(action);
          console.log(serialize);

          return serialize;

        },

        onSuccess: function(data, textStatus, jqXHR) { //对成功应答进行处理，返回false，表示实际请求失败

          console.log('onSuccess(data, textStatus, jqXHR)');
          console.log(data);
          console.log(textStatus);
          console.log(jqXHR);

          return true;

        },

        onFail: function(jqXHR, textStatus, errorThrown) {

          console.log('onFail(jqXHR, textStatus, errorThrown)');
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);

        }

      });

    });

    this.futuresList = [
      {
        exchangeId : '100001',      //交易所代码
        productId : '880001',       //期货品种代码
        productName : '期货合约-1',     //名称
        volumeMultiple : 100, //合约乘数
        priceTick : 10,       //最小价格变动单位
        feeMode : 23          //最小价格变动单位
      },
      {
        exchangeId : '100002',      //交易所代码
        productId : '880002',       //期货品种代码
        productName : '期货合约-2',     //名称
        volumeMultiple : 100, //合约乘数
        priceTick : 10,       //最小价格变动单位
        feeMode : 23          //最小价格变动单位
      },
      {
        exchangeId : '100001',      //交易所代码
        productId : '880003',       //期货品种代码
        productName : '期货合约-3',     //名称
        volumeMultiple : 100, //合约乘数
        priceTick : 10,       //最小价格变动单位
        feeMode : 23          //最小价格变动单位
      },
      {
        exchangeId : '100001',      //交易所代码
        productId : '880004',       //期货品种代码
        productName : '期货合约-4',     //名称
        volumeMultiple : 100, //合约乘数
        priceTick : 10,       //最小价格变动单位
        feeMode : 23          //最小价格变动单位
      },
      {
        exchangeId : '100001',      //交易所代码
        productId : '880005',       //期货品种代码
        productName : '期货合约-5',     //名称
        volumeMultiple : 100, //合约乘数
        priceTick : 10,       //最小价格变动单位
        feeMode : 23          //最小价格变动单位
      },
      {
        exchangeId : '100001',      //交易所代码
        productId : '880006',       //期货品种代码
        productName : '期货合约-6',     //名称
        volumeMultiple : 100, //合约乘数
        priceTick : 10,       //最小价格变动单位
        feeMode : 23          //最小价格变动单位
      }
    ];

  }

  addFutures() {

    var tr = "<tr><td>600000</td><td>浦发银行</td><td>0789797</td><td>2132</td><td>4.4万</td><td>创业板</td></tr>";
    $('#futures-table').append(tr).DrawToolbar({
      editButton: true,
      deleteButton: true
    });

  }

}
