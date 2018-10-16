import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAccountModel } from 'src/app/models/user-account.model';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { CustomValidators } from 'src/app/custom-validators/custom-validators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  private loggedInUser: UserAccountModel;

  constructor(private _userAccountService: UserAccountService) { 
    
  }

  ngOnInit() {
    this.loggedInUser = this._userAccountService.loggedInUser;

    this.createUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, CustomValidators.ValidateEmail]),
      phone: new FormControl('', [CustomValidators.ValidatePhone]),
      role: new FormControl('', []),
      clientId: new FormControl(this.loggedInUser.clientId, []),
      assignedPortals: new FormControl('')
    });

    
  }

  public createNewUser() {
    if (this.createUserForm.valid) {
      let newUser: UserAccountModel = <UserAccountModel>this.createUserForm.value;
      this._userAccountService.createUser(newUser).then(usr => console.log(usr)).catch(err => alert(err));
    }
  }
}
