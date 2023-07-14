import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../base/base.component';
import { AuthService, _isAuthenticated } from '../services/common/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private toastrService:ToastrService,private spinner:NgxSpinnerService,private authService:AuthService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.identiytyCheck();
    this.spinner.show(SpinnerType.BallSpinClockwiseFadeRotating);
   let x:Boolean=_isAuthenticated;
    if(!_isAuthenticated){
      this.router.navigate(["login"],{
        queryParams:{
          returnUrl:state.url
        }
      });
      this.toastrService.error("you are not logged","Login first")
      
    }
    this.spinner.hide(SpinnerType.BallSpinClockwiseFadeRotating);
    return true;
  }

}
