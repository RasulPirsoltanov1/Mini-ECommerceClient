import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private userService: UserService, spinner: NgxSpinnerService, public authService: AuthService, private activateRoute: ActivatedRoute, private router: Router) {
    super(spinner)
  }

  async login(userNameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    const token: Token = await this.userService.login(userNameOrEmail, password, () => {
      this.authService.identiytyCheck();
      this.activateRoute.queryParams.subscribe(params=>{
        this.router.navigate([params["returnUrl"]]);
      })
      this.hideSpinner(SpinnerType.BallScaleMultiple);
    });
  }
}
