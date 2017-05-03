/**
 * 行情订阅
 * Created by Zhou on 2017/4/14.
 */
export class MdService{

  public platId : number; //平台编号
  public ip : string;       //IP
  public port : number; //端口
  public adapterType : number; //适配器类型

  public serviceId : number;     //服务编号
  public serviceType : number;     //服务类型
  constructor() {}

}

/**
 *返回参数
 */
export class MdServicePage {

  public mdService : MdService[];
  public totalPages : string;
  public totalRows : string;

}
