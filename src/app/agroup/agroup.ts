/**
 * Created by wang on 2017/4/13.
 * 登陆
 */
export class Agroup{

  public groupName : string; //组名
  public groupId : string; //组ID
  public time : string; //创建时间
  public author : string; //创建人
  public comment  : string; //备注






    constructor() {}

}

/**
 *
 */
export class AgroupPage {

    public agroup : Agroup[];
    public totalPages : string;
    public totalRows : string;

}
