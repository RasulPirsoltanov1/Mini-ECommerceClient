import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ProductsUiModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsUiModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    LoginModule
  ]
})
export class ComponentsModule { }
