import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {

  }
  products: List_Product[];
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  async ngOnInit(): Promise<void> {
    setTimeout(async ()=>{
      this.activatedRoute.params.subscribe(params => {
        this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      });
      const data: { totalCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize, () => {
  
      }, errorMessage => {
  
      });
      // this.products.forEach((product,i) => {
        
      // });
      console.log(data);
      for (const iterator of data.products) {
        const date = new Date(iterator.createdDate);
        const formattedDate = date.toLocaleString('en-US');
        const date2 = new Date(iterator.updatedDate);
        const formattedDate2 = date.toLocaleString('en-US');
        iterator.createdDate = formattedDate;
        iterator.updatedDate = formattedDate2;
      }
      this.products = data.products;
      this.totalProductCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      this.pageList = [];
  
      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);
  
      else if (this.currentPageNo + 3 >= this.totalPageCount)
        if (this.totalPageCount - 6 >= 0) {
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
            this.pageList.push(i);
        }
        else
          if (this.totalPageCount - 3 >= 0) {
            for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
              this.pageList.push(i);
          }
    },1)
   
  }
}
