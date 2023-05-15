import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ProductsUiModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsUiModule,
    HomeModule,
    BasketsModule
  ]
})
export class ComponentsModule { }
