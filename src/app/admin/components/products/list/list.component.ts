import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { SelectProductImageComponent, SelectProductImageState } from 'src/app/dialogs/select-product-image/select-product-image.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate', 'updatedDate','photos', 'edit', 'delete'];
  constructor(spinner: NgxSpinnerService, public productService: ProductService, private alertify: AlertifyService,public dialogService:DialogService) {
    super(spinner);
  }
  dataSource = new MatTableDataSource<List_Product>();

  async getProducts() {
    this.showSpinner(SpinnerType.BallAtom)
    const allProductList: { totalCount: number, products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(), (errorMessage) => {
      this.alertify.message("data not found.", {
        delay: 2,
        dissmissOthers: true,
        messageType: MessageType.Error,
        position: Position.BottomCenter
      })
    });
    this.dataSource = new MatTableDataSource<List_Product>(allProductList.products);
    this.paginator.length = allProductList.totalCount;
    console.log(this.paginator.length)
    console.log(allProductList.totalCount)
  }
  async ngOnInit() {
    await this.getProducts()
  }
  async pageChange() {
    await this.getProducts();
  }
  addProductImages(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageComponent,
      data:id,
      options:{
        width:"85%"
      }
    })
  }
  delete(id: string,event:Event) {
    // const img = event.target as HTMLElement;
    // $(img.parentElement.parentElement).fadeOut(1000)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}





