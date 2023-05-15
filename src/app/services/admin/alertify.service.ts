import { Injectable } from '@angular/core';
import { error } from 'jquery';
declare var alertify:any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message:string,alertifyOptions:Partial<AlertifyOptions>){
    alertify.set('notifier','delay', alertifyOptions.delay);
    alertify.set('notifier','position', alertifyOptions.position);
    const msj=alertify[alertifyOptions.messageType](message)
    if(alertifyOptions.dissmissOthers){
      msj.dissmissOthers()
    }
  }
  dissmiss(){
    alertify.dissmiss()
  }
}


export enum MessageType{
  Error="error",
  Message="message",
  Notify="notify",
  Warning="warning",             
  Success="success",
}

export enum Position{
  BottomRight="bottom-right",
  TopRight="top-right",
  TopCenter="top-center",
  TopLeft="top-left",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left"
}
export class AlertifyOptions{
  messageType:MessageType;
  position:Position=Position.BottomRight;
  delay:number=3;
  dissmissOthers:boolean=false;
}