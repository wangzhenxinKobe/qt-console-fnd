
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

  accountId : string;

}

export class OperatorPage {

  public operators : Operator[];
  public totalPages : number;
  public totalRows : number;

}

