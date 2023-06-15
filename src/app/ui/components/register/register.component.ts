import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/user/create_user';
import { User } from 'src/app/entities/user';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService, public toastrService: ToastrService,
    spinner: NgxSpinnerService) {
      super(spinner)
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
      passwordConfirm: ["", [Validators.required,
      Validators.maxLength(50),
      Validators.minLength(6)]]
    }, {
      validators: this.password.bind(this)
    })
  }
  get component() {
    return this.frm.controls;
  }
  submitted: Boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;
    const result:Create_User = await this.userService.create(user);
    if(result.succeded){
      this.toastrService.success(result.message);
    }
    else{
      this.toastrService.error(result.message);
    }
   
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: passwordConfirm } = formGroup.get('passwordConfirm');
    return password === passwordConfirm ? null : { passwordNotMatch: true };
  }

}
