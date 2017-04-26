/**
 * Created by wang on 2017/4/13.
 */
export class Account {

  public accountId : number; //交易所代码
  public platId : number;       //期货品种代码
  public serviceId : number; //期货品种名称
  public userId : string;      //合约乘数
  public fundCode  : string; //最小价格变动单位
  public commAccount : string;       //计费方式
  public commPassword : string;
  public flowPath : string; //期货品种名称
  public isauth : string;      //合约乘数
  public userProductInfo  : string; //最小价格变动单位
  public inverstorId : string;       //计费方式
  public tradePassword : string;
  public groupId : string;
  public ratio : number;
  public groupName : string;



  constructor() {}

}

/**
 *
 */
export class AccountPage {

  public account : Account[];
  public totalPages : string;
  public totalRows : string;

}
