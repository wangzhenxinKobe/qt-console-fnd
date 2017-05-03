/**
 * 行情订阅
 * Created by Zhou on 2017/4/14.
 */
export class TdService{

  public platId : number; //平台编号
  public ip : string;       //IP
  public port : number; //端口
  public adapterType : number; //适配器类型
  public userId : string; //用户代码
  public tradePassword : string; //交易密码
  // public accountId : number; //账户编号
  public serviceId : number;     //服务编号
  public serviceType : number;//服务类型
  public accountId : number;//服务类型
  constructor() {}

}

/**
 *返回参数
 */
export class TdServicePage {
  public tdService : TdService[];
  public totalPages : string;
  public totalRows : string;
}
