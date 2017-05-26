/**
 * Created by wang on 2017/4/13.
 * 期货基本类
 */
export class Fuorders {
    public symbol : string;       //期货代码
    public exchange : string; //交易所
    public direction : string;      //买卖方向
    public offset  : string; //交易方式
    public hedge : string;       //投机套保指令
    public  entrustprice : string; //价格
    public  entrustVolume : number; //数量
    public  orderTradeTppe : string; //指令
  public instrumentId : string; //合约代码
    rgAccountDTOlist : FuordersFunc[];

    constructor() {}
}

/**
 *
 */

export  class FuordersFunc{
  public accountId : number; //账户ID
  public userId : string; //用户代码
  public ratio : number; //系数
  active : boolean = false;   //是否被点击激活
}

export class FuordersAccount {
    public groupName : string;
    public fuorders : Fuorders[];
    public instrument : Instrument[];
    public active : boolean = true;
    public rgAccountDTOlist : FuordersFunc[];
}

export  class Instrument {
  public instrumentName : string;       //合约名称
  public instrumentId : string; //合约代码
  public dLastPrice : string;      //最新价
  public dHighestPrice  : string; //最高价
  public dLowestPrice : string;       //最低价
  public  dBidPrice : string; //买一价
  public  nBidVolume : string; //买一量
  public  dAskPrice : string; //卖一价
  public  nAskVolume : string; //卖一量
  public  dUpperLimitPrice : string; //涨停价
  public  dLowerLimitPrice : string; //跌停价
  public  dPreSettlementPrice : string; //昨结算价
  public  nUpdateTime : string; //行情更新时间
  public active : boolean = false;   //是否被点击激活
  constructor(){}

}

export  class  Positioninfo {
  public accountId : string; //账户ID
  public tradeUnitId : string;      //
  public symbol  : string; //合约代码
  public direction : string;       //买卖方向
  public  hedge : string; //投机套保指令
  public  ydpos : string; //昨仓
  public  pos : string; //今仓
  public  floating : string; //浮动盈亏
  public  opsition : string; //持仓盈亏
  public  contractDeposit : string; //合约占用保证金
}
