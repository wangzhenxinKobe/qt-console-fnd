/**
 * Created by wang on 2017/4/13.
 * 股票篮子查询类
 */
export class Sbasket {

    public stockCode : string; //股票代码
    public basketName : string;       //篮子名称
    public weight : string; //权重
    public volume : number;      //股数
    public errCode1  : string; //备选代码
    public volume1 : number;       //备选股数


    // public comment : string;
    //
    // public paraList :{
    //     paraName  : string;
    //     paraType  : string;
    //     paraValue : string; }[];

    constructor() {}

}

/**
 *
 */
export class SbasketPage {

    public sbasket : Sbasket[];
    public totalPages : string;
    public totalRows : string;

}
