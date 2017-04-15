/**
 * 测试用，针对策略的内存数据库
 *
 */

import { InMemoryDbService } from 'angular-in-memory-web-api';


export class StrategyInMemoryDataService implements InMemoryDbService {

  createDb() {

    let strategies = [
      {
        strategyName : 'strategy-1', //策略名称
        platId : '101',       //平台编号
        strategyType : '0', //策略类型
        winFile : 'file-1',      //策略文件名
        strategyVer  : 'v1.0.0', //策略版本
        author : 'gavin',       //开发者
        comment : 'good',

        paraList : [
          {
            paraName  : 'para-1',
            paraType  : 'int',
            paraValue : 'para-value-1',
          }
        ]
      },
      {
        strategyName : 'strategy-2', //策略名称
        platId : '101',       //平台编号
        strategyType : '0', //策略类型
        winFile : 'file-2',      //策略文件名
        strategyVer  : 'v1.0.0', //策略版本
        author : 'gavin',       //开发者
        comment : 'good',

        paraList : [
          {
            paraName  : 'para-6',
            paraType  : 'int',
            paraValue : 'para-value-6',
          },
          {
            paraName  : 'para-1',
            paraType  : 'int',
            paraValue : 'para-value-1',
          },
          {
            paraName  : 'para-2',
            paraType  : 'int',
            paraValue : 'para-value-2',
          },
          {
            paraName  : 'para-3',
            paraType  : 'double',
            paraValue : 'para-value-3',
          },
          {
            paraName  : 'para-4',
            paraType  : 'string',
            paraValue : 'para-value-4',
          }
        ]
      },
      {
        strategyName : 'strategy-3', //策略名称
        platId : '101',       //平台编号
        strategyType : '0', //策略类型
        winFile : 'file-3',      //策略文件名
        strategyVer  : 'v1.0.0', //策略版本
        author : 'gavin',       //开发者
        comment : 'good',

        paraList : [
          {
            paraName  : 'para-1',
            paraType  : 'int',
            paraValue : 'para-value-1',
          },
          {
            paraName  : 'para-2',
            paraType  : 'int',
            paraValue : 'para-value-2',
          },
          {
            paraName  : 'para-3',
            paraType  : 'double',
            paraValue : 'para-value-3',
          },
          {
            paraName  : 'para-4',
            paraType  : 'string',
            paraValue : 'para-value-4',
          }
        ]
      },
      {
        strategyName : 'strategy-4', //策略名称
        platId : '101',       //平台编号
        strategyType : '0', //策略类型
        winFile : 'file-4',      //策略文件名
        strategyVer  : 'v1.0.0', //策略版本
        author : 'gavin',       //开发者
        comment : 'good',

        paraList : [
          {
            paraName  : 'para-1',
            paraType  : 'int',
            paraValue : 'para-value-1',
          },
          {
            paraName  : 'para-2',
            paraType  : 'int',
            paraValue : 'para-value-2',
          },
          {
            paraName  : 'para-3',
            paraType  : 'double',
            paraValue : 'para-value-3',
          },
          {
            paraName  : 'para-4',
            paraType  : 'string',
            paraValue : 'para-value-4',
          }
        ]
      },
      {
        strategyName : 'strategy-5', //策略名称
        platId : '101',       //平台编号
        strategyType : '0', //策略类型
        winFile : 'file-5',      //策略文件名
        strategyVer  : 'v1.0.0', //策略版本
        author : 'gavin',       //开发者
        comment : 'good',

        paraList : [
          {
            paraName  : 'para-1',
            paraType  : 'int',
            paraValue : 'para-value-1',
          },
          {
            paraName  : 'para-2',
            paraType  : 'int',
            paraValue : 'para-value-2',
          },
          {
            paraName  : 'para-3',
            paraType  : 'double',
            paraValue : 'para-value-3',
          },
          {
            paraName  : 'para-4',
            paraType  : 'string',
            paraValue : 'para-value-4',
          }
        ]
      }

    ];

    return {strategies};

  }

}
