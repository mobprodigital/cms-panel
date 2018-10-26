import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFail: boolean = false;
  loginErrMsg: string = "email and password does not match";
  showProgressBar: boolean = false;


  constructor(private _userAccountService: UserAccountService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  public login() {
    if (this.loginForm.valid) {
      this.showProgressBar = true;
      this._userAccountService.login(this.loginForm.value['email'], this.loginForm.value['password']).then(resp => {
        this.loginFail = false;
        this.showProgressBar = false;
      }).catch(err => {
        this.loginErrMsg = err;
        this.loginFail = true;
      });
    }
  }

}
