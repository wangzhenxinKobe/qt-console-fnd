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
    public active : boolean = true;
    public rgAccountDTOlist : FuordersFunc[];
}
