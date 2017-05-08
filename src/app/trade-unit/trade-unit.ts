
export class TradeUnit {

  public tradeUnitId : string;  //交易单元名称
  public platId : string;       //平台编号
  public strategyType : string; //策略类型
  public strategyName : string; //策略名称
  public author : string;       //开发者
  public status : string;       //状态

  public paramList :TradeUnitParam[];

  public accountList : TradeUnitAcct[];

  constructor() {}

}

export class TradeUnitParam {
  paraName  : string;         //参数名
  paraType  : string;         //数据类型
  paraValue : string;         //参数值
  defaultValue : string;  //参数默认值
  comment : string;           //备注信息
}

export class TradeUnitAcct {
  fundCode : string = '';      //产品编号
  userId : string = '';        //用户代码
  inverstorId : string = '';   //投资代码
  brokerName : string = '';    //经济公司名称
  accountType : string = '';   //账户类型
  isSaved : boolean = true;      //是否已被保存到服务端
}
/**
 *
 */
export class TradeUnitPage {

  public tradeUnits : TradeUnit[];
  public totalPages : number;
  public totalRows : number;

}
