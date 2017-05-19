/**
 * Created by wang on 2017/4/13.
 * 登陆
 */
export class Fupro{

    public fundCode : string; //产品编号
    public fundName : string;       //产品名称
    public initialCaptital : number; //初始资金
    public createDate : number;      //成立日期
    public dueDate  : number; //到期日



    constructor() {}

}

/**
 *
 */
export class FuproPage {

    public fupro : Fupro[];
    public totalPages : string;
    public totalRows : string;

}
