import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {


  public verifyEmailForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.verifyEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  public onSubmit() {
    console.log(this.verifyEmailForm.value);
  }
}
