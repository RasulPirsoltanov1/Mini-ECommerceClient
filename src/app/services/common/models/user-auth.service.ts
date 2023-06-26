import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/user/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { ToastrService } from 'ngx-toastr';
import { TokenResponse } from 'src/app/contracts/token/TokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(public httpClientService: HttpClientService, private toastrService: ToastrService) { }
  async create(user: User): Promise<Create_User> {
    const result: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "Users",
    }, user)
    return await firstValueFrom(result) as Create_User;
  }
  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<TokenResponse | any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth", action: "login"
    }, {
      userNameOrEmail, password
    })
    const token: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken);
      localStorage.setItem("refreshToken", token.token.refreshToken);
      this.toastrService.success("Successful Login", "successfull")
    }
    callBackFunction();
    return token;
  }
  async refreshToken(refreshToken: string, callBackFunction?: () => void) {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshToken",
      controller: "auth"
    }, {
      refreshToken: refreshToken
    });
    const tookenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tookenResponse) {
      localStorage.setItem("accessToken", tookenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tookenResponse.token.refreshToken);
      this.toastrService.warning("Ok")
    }
    else{
      callBackFunction();
    }
  }
}
