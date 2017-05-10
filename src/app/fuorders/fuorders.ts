/**
 * Created by wang on 2017/4/13.
 * 股票基本信息维护基本类
 */
export class Fuorders {

    public accountId : number; //账户ID
    public symbol : string;       //期货代码
    public exchange : string; //交易所
    public direction : string;      //买卖方向
    public offset  : string; //交易方式
    public hedge : string;       //投机套保指令
    public  entrustprice : string; //价格
  public  entrustVolume : number; //数量
  public  orderTradeTppe : string; //指令



    // public paraList :{
    //     paraName  : string;
    //     paraType  : string;
    //     paraValue : string; }[];

    constructor() {}

}

/**
 *
 */
export class FuordersPage {

    public fuorders : Fuorders[];
    public totalPages : string;
    public totalRows : string;

}
