/**
 * Created by wang on 2017/4/13.
 * 登陆
 */
export class Tplatform{

    public platId : number; //平台编号
    public ip : string;       //服务器IP
    public port : number; //端口
    public deploySite : string;      //部署地点
    public comment  : string; //备注






    constructor() {}

}

/**
 *
 */
export class TplatformPage {

    public tplatform : Tplatform[];
    public totalPages : string;
    public totalRows : string;

}
