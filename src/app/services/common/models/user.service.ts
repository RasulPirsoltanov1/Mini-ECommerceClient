import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/user/create_user';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpClientService: HttpClientService) { }
  async create(user: User): Promise<Create_User> {
    const result: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "Users",
    }, user)
    return await firstValueFrom(result) as Create_User;
  }
  async login(userNameOrEmail: string, password: string,callBackFunction?:()=>void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users", action: "login"
    }, {
      userNameOrEmail, password
    })
    await firstValueFrom(observable);
    callBackFunction();
  }
}
