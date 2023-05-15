import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {

  }
  showSpinner(spinnerType: SpinnerType = SpinnerType.BallAtom) {
    this.spinner.show(spinnerType)
    setTimeout(() => this.spinner.hide(spinnerType), 511)
  }
  hideSpinner(spinnerType: SpinnerType = SpinnerType.BallAtom) {
    this.spinner.hide(spinnerType,1000)
  }
}
export enum SpinnerType {
  BallSpinClockwiseFadeRotating = 's1',
  BallAtom = "s2",
  BallScaleMultiple = 's3'
}