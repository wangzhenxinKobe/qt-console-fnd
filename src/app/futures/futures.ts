/**
 * Created by wang on 2017/4/13.
 */
export class Futures {

    public exchangeId : string; //交易所代码
    public productId : string;       //期货品种代码
    public productName : string; //期货品种名称
    public volumeMultiple : number;      //合约乘数
    public priceTick  : number; //最小价格变动单位
    public feeMode : number;       //计费方式

    constructor() {}

}

/**
 *
 */
export class FuturesPage {

    public futures : Futures[];
    public totalPages : string;
    public totalRows : string;

}
