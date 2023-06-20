import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './admin/layout/layout.module';
import { UiModule } from './ui/ui.module';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { BaseComponent } from './base/base.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    UiModule,
    AdminModule,
    ToastrModule.forRoot(), 
    NgxSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    JwtModule.forRoot(
      {
        config:{
          tokenGetter:()=>localStorage.getItem("accessToken"),
          allowedDomains:["localhost:7201","localhost:5201"]
        }
      }
    )
  ],
  providers: [
    {provide:"baseUrl", useValue:"https://localhost:7201/api", multi:true},
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
