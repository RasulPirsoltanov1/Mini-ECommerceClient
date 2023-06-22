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
      localStorage.setItem("accessToken",token.token.accessToken);
      this.toastrService.success("Successful Login","successfull")
    }
    callBackFunction();
    return token;
  }
}
