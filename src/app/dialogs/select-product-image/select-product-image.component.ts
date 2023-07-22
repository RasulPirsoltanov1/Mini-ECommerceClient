import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { DialogModule } from '../dialog.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list-product-image';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-select-product-image',
  templateUrl: './select-product-image.component.html',
  styleUrls: ['./select-product-image.component.scss']
})
export class SelectProductImageComponent extends BaseDialog<SelectProductImageComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<SelectProductImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    public productService: ProductService,
    private sanitizer: DomSanitizer,
    public spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef)
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png,.jpg,.jpeg,.gif",
    controller: "Products",
    action: "upload",
    explanation: "select the product...",
    isAdminPage: true,
    queryString: `id=${this.data}`
  }
  images: List_Product_Image[];

  async ngOnInit() {

    this.spinner.show();
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide());
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  async deleteImage(ImageId: string) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);
        await this.productService.deleteImage(this.data as string, ImageId, () => this.spinner.hide(SpinnerType.BallAtom));
        this.ngOnInit();
      }
    })

  }
  async showCase(imageId: string) {
    this.spinner.show(SpinnerType.BallAtom);
    await this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinner.hide(SpinnerType.BallAtom);
    })
  }
}
export enum SelectProductImageState {
  Close
}
