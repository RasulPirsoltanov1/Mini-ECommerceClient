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
import { UploadDialogComponent } from './dialogs/upload-dialog/upload-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    
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
    HttpClientModule
  ],
  providers: [
    {provide:"baseUrl", useValue:"https://localhost:7201/api", multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
