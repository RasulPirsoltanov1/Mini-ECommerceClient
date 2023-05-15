import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { firstValueFrom } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective extends BaseComponent {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    spinner: NgxSpinnerService,
    public dialog: MatDialog,
    public alertifyService:AlertifyService) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png")
    img.setAttribute("style", "cursour:pointer")
    img.height = 40;
    img.width = 40;
    _renderer.appendChild(element.nativeElement, img);
    super(spinner)
  }
  @Input() id: string;

  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      this.showSpinner(SpinnerType.BallScaleMultiple)
      console.log(this.element)
      // await this.productService.delete(this.id);
     this.httpClientService.delete<any>({
        controller: "products",
      }, this.id).subscribe(data=>{
        $(this.element.nativeElement.parentElement).fadeOut(200, () => {
          this.callback.emit();
          this.alertifyService.message(this.controller+" deleted successfully.",{
            delay:2,
            dissmissOthers:true,
            messageType:MessageType.Success,
            position:Position.TopRight
          })
        })
      },(errorResponse:HttpErrorResponse)=>{
        this.alertifyService.message("Something went wrong.",{
          delay:2,
          dissmissOthers:true,
          messageType:MessageType.Error,
          position:Position.TopRight
        })
      });
      
    })
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed()
      }
    });
  }
}
