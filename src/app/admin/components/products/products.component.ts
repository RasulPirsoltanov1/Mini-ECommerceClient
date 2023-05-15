import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import { Product } from 'src/app/contracts/product';
import { HttpClientService, RequestParameters } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private httpClientServer: HttpClientService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner()
    this.httpClientServer.get<Product[]>({
      controller: "products"
    }).subscribe(data => {
      console.log(data)
    })
    
  }
  @ViewChild(ListComponent) listComponents:ListComponent;
  createProduct(create_product:CreateProduct){
    this.listComponents.getProducts();
  }
}
