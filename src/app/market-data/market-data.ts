
/**
 * 行情订阅
 * Created by Zhou on 2017/4/14.
 */
export class MarketData{

  public platId : number; //平台编号
  public symbolType : number;       //代码类型
  public symbolId : string; //合约代码

  constructor() {}

}

/**
 *返回参数
 */
export class MarketDataPage {

  public marketData : MarketData[];
  public totalPages : string;
  public totalRows : string;

}
