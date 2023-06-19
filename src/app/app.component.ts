import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-CommerceClient';
  constructor(public authService:AuthService,private toastrService:ToastrService,private router:Router) {
 
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.router.navigate([""])
    this.authService.identiytyCheck();
    this.toastrService.success("you are log out successfully. ","successfull");
  }
}
