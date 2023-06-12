import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
  }
  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)]],
      userName: ["", [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(2)]],
      email: ["", [Validators.required,
      Validators.maxLength(50),
      Validators.email]],
      password: ["", [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(6)]],
      passwordRepeat: ["", [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(6)]]
    })
  }
  onSubmit(test: any) {
    console.log(test);
  }

}
