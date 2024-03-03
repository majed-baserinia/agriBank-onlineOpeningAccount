export interface Accounts {
    Accounts: string ;
  }
  
export const SaveAccounts = (account: Accounts): void => {
    sessionStorage.setItem("Accounts",JSON.stringify (account.Accounts));
  };
  
  class AccountModel {
    acc: string;
    exp: string;
    isjari: boolean;
    cur: string;
    exp2: string;
    isdefaultaccbasedoncommonacc: any;
  
    constructor(acc: string, exp: string, isjari: boolean, cur: string, exp2: string, isdefaultaccbasedoncommonacc: any) {
        this.acc = acc;
        this.exp = exp;
        this.isjari = isjari;
        this.cur = cur;
        this.exp2 = exp2;
        this.isdefaultaccbasedoncommonacc = isdefaultaccbasedoncommonacc;
    }
  }
  
  export const getAccounts = ()  => {
    const accountsData=sessionStorage.getItem("Accounts");
    if(Array.isArray(accountsData))
    {
      let accounts = accountsData.map(x => {
        return new AccountModel(
          x.acc,
          x.exp,
          x.isjari,
          x.cur,
          x.exp2,
          x.isdefaultaccbasedoncommonacc
        );
       });
       return {data:accounts}
    }
    else
    return {data:null}
  };