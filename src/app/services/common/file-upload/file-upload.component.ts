import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { data, error } from 'jquery';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
   private dialog:MatDialog,
   ) { }
  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    for (let file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        let formData = new FormData();
        formData.append(_file.name, _file, file.relativePath);
        console.log(formData.getAll.toString())
        this.httpClientService.post<any>({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, formData).subscribe(data => {
          if (this.options.isAdminPage) {
            this.alertifyService.message("files uploaded successfully.", {
              delay: 4,
              messageType: MessageType.Success,
              position: Position.BottomRight
            })
          }
          else {
            this.customToastrService.message("files uploaded successfully.", "Success", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.BottomRight,
            })
          }
        },
          (httpErrorResponse: HttpErrorResponse) => {
            if (this.options.isAdminPage) {
              this.alertifyService.message("Something went wrong.", {
                delay: 4,
                messageType: MessageType.Error,
                position: Position.BottomRight
              })
            }
            else {
              this.customToastrService.message("Something went wrong.", "Error", {
                messageType: ToastrMessageType.Error,
                position: ToastrPosition.BottomRight,
              })
            }
            console.log(httpErrorResponse.message)
          }
        );
      });
    }
  }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
export enum UploadState {
  Yes,
  No
}