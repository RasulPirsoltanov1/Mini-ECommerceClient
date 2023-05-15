import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create-product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(private prodductService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner)
  }
  ngOnInit(): void {

  }
  @Output() createdProduct:EventEmitter<CreateProduct>=new EventEmitter();
  @Output() fileUploadOptions:Partial<FileUploadOptions>={
    controller:"products",
    action:"Upload",
    explanation:"chose images",
    isAdminPage:true,
    accept:".png,.jpg,.jpeg"
  }
  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom)
    const create_product: CreateProduct = new CreateProduct();
    create_product.name = name.value;
    create_product.price = parseInt(price.value);
    create_product.stock = parseFloat(stock.value);
    if(!name.value){
      this.alertify.message("name validation is working.", {
        dissmissOthers:true,
        delay: 2,
        messageType: MessageType.Error,
        position:Position.TopCenter
      })
    }
    this.prodductService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.createdProduct.emit(create_product);
      this.alertify.message("product added successfully.", {
        dissmissOthers:true,
        delay: 2,
        messageType: MessageType.Success,
        position:Position.TopRight
      })
    },
    errorMessage=>{
      this.alertify.message(errorMessage,{
        dissmissOthers:true,
        delay:6,
        messageType:MessageType.Error,
        position:Position.TopRight
      })
    })
  }
}
