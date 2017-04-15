/**
 * Created by gavin on 2017/4/13.
 * 量化策略基本信息类
 */

export class Strategy {

  public strategyName : string; //策略名称
  public platId : number;       //平台编号
  public strategyType : number; //策略类型
  public winFile : string;      //策略文件名
  public strategyVer  : string; //策略版本
  public author : string;       //开发者
  public comment : string;

  public paraList :{
    paraName  : string;
    paraType  : string;
    paraValue : string; }[];

  constructor() {}

}

/**
 *
 */
export class StrategyPage {

  public strategies : Strategy[];
  public totalPages : number;
  public totalRows : number;

}
