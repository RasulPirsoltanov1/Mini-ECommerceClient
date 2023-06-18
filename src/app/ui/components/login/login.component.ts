import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Token } from 'src/app/contracts/token/token';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  constructor(private userService: UserService, spinner: NgxSpinnerService, public authService: AuthService) {
    super(spinner)
  }

  async login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    const token: Token = await this.userService.login(userNameOrEmail, password, () => {
      this.authService.identiytyCheck();
      this.hideSpinner(SpinnerType.BallScaleMultiple);
    });
  }
}
