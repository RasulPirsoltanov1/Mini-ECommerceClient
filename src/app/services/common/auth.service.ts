import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  identiytyCheck(){
    debugger;
    const helper = new JwtHelperService();
    const token: string = localStorage.getItem("accessToken");
    let expired:boolean;
     try{
      expired=helper.isTokenExpired(token);
     }
     catch{
      expired=true;
     }
     _isAuthenticated=(token!=null && !expired);
  console.log(_isAuthenticated)
     
  }

  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
}

export let _isAuthenticated:boolean;