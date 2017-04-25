/**
 * Created by wang on 2017/4/13.
 * 股票基本信息维护基本类
 */
export class Binfo {

    public stockCode : string; //股票代码
    public stockName : string;       //股票名称
    public exchangeId : string; //交易所代码
    public flowVolume : number;      //流通股本
    public allVolume  : number; //总股本
    public stockBoard : number;       //所属板块
    public  isFund : string; //是否是基金
    public  isIndex : string; //是否是指数


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
export class BinfoPage {

    public binfo : Binfo[];
    public totalPages : string;
    public totalRows : string;

}
