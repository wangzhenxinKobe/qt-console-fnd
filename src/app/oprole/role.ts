
export class Role {

  public roleId : string;     //角色编号
  public roleName : string;  //角色名称
  public roleDescr : string; //角色描述

  public fieldList : RoleFunc[]; //功能权限列表

}

export class RoleFunc {

  public funcId : string;   //权限编号
  public funcName : string; //权限名称
  public pFuncId : string;  //上级ID

}

export class RolePage {

  public roles : Role[];
  public totalPages : number;
  public totalRows : number;

}

export class SysParentFunc {

  public funcId : string;   //权限编号
  public funcName : string; //权限名称
  public pFuncId : string = '0';
  public children : RoleFunc[];

}
