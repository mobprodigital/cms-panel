import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPwdForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.resetPwdForm = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit(){
    console.log(this.resetPwdForm.value);
  }

}
