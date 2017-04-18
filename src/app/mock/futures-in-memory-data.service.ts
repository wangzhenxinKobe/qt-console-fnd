
import { InMemoryDbService } from 'angular-in-memory-web-api';


export class StrategyInMemoryDataService implements InMemoryDbService {

  createDb() {

    let futures = [
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

    return (futures);

  }

}
