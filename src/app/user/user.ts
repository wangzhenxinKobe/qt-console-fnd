
export class User {

  userNo : string;
  userName  : string;

}

export class Authority {

  id: string;
  icon : string;
  name : string;
  children : {
    id : string;
    url : string;
    name : string;
  }

}
