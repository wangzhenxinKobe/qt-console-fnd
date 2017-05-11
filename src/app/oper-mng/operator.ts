
export class Operator {

  sysUserId : string;
  userName : string;
  userNo : string;
  remark :string;
  roleId : string;
  roleName : string;

  userAccountList : OperAccount[];

}

export class OperAccount {

  accountId : number; //交易账户ID
  platId : number;    //平台编号
  userId : string;    //交易账户名称
  active : boolean = false;   //是否被点击激活
}

export class OperatorPage {

  public operators : Operator[];
  public totalPages : number;
  public totalRows : number;

}

