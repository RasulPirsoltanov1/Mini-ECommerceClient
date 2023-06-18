import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { CustomerModule } from './admin/components/customer/customer.module';
import { ProductsModule } from './admin/components/products/products.module';
import { OrderModule } from './admin/components/order/order.module';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { BasketsModule } from './ui/components/baskets/baskets.module';
import { ProductsUiModule } from './ui/components/products/products.module';
import { RegisterModule } from './ui/components/register/register.module';
import { LoginModule } from './ui/components/login/login.module';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      {path:"",component:DashboardComponent },
      { path: "customers", loadChildren: () => import("./admin/components/customer/customer.module").then(module => CustomerModule) },
      { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => ProductsModule) },
      { path: "orders", loadChildren: () => import("./admin/components/order/order.module").then(module => OrderModule) },
    ],
    canActivate:[AuthGuard]
  },
  { path:"",component:HomeComponent},
  { path:"basket",loadChildren:() => import("./ui/components/baskets/baskets.module").then(module=>BasketsModule)},
  { path:"products",loadChildren:() => import("./ui/components/products/products.module").then(module=>ProductsUiModule)},
  { path: "register", loadChildren: () => import("./ui/components/register/register.module").then(module => RegisterModule) },
  { path: "login", loadChildren: () => import("./ui/components/login/login.module").then(module => LoginModule) },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
