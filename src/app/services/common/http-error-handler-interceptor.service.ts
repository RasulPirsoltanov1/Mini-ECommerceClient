import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, of } from 'rxjs';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: ToastrService,private userAuthService:UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log("Asds");
  
    return next.handle(req).pipe(catchError( error => {
      console.log(error)
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.error("you are not a memmber!")
        var x=this.userAuthService.refreshToken(localStorage.getItem("refreshToken")).then();
         console.log(x);
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.error("Wrong try!")
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.error("Not Found!")
          break;
        default:
          this.toastrService.error("Error cant define!")
          break;
      }
      return of(error);
    }))
  };
}

