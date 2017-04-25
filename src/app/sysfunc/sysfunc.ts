/**
 * Created by Zhou on 2017/4/14.
 */
export class Sysfunc {
  public funcId : string; //权限编号
  public pFuncId : string;       //上级编号
  public funcName : string; //权限名称
  public url : string;      //URL
  public remark  : string; //角色描述
  public level : string;       //级别
  public status : string;     //状态
  constructor() {}
}

/**
 *
 */
export class SysfuncPage {

  public sysfunc : Sysfunc[];
  public totalPages : string;
  public totalRows : string;

}
