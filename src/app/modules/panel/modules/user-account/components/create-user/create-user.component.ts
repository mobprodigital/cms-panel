import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAccountModel } from 'src/app/models/user-account.model';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { CustomValidators } from 'src/app/custom-validators/custom-validators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRoleModel } from 'src/app/models/user-role.model';
import { UserRole } from 'src/app/enums/user-roles.enum';
import { PortalService } from 'src/app/services/portal/portal.service';
import { PortalModel } from 'src/app/models/portal.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  private loggedInUser: UserAccountModel;
  public userRoleList: UserRoleModel[] = [];
  public portalList: PortalModel[] = [];
  public userId: string = '';
  public isNewUser: boolean = true;
  
  constructor(private _userAccountService: UserAccountService, private _authService: AuthService, private _portalService: PortalService, private route: ActivatedRoute) {

    this.loggedInUser = this._authService.loggedInUser;

    if (this.loggedInUser.role.roleId == '2') {
      this.userRoleList.push(...[
        new UserRoleModel('3', UserRole.Admin),
        new UserRoleModel('4', UserRole.User),
      ]);
    } else if (this.loggedInUser.role.roleId == '3') {
      this.userRoleList.push(...[
        new UserRoleModel('4', UserRole.User),
      ]);
    }

    this.getPortals();

    this.route.paramMap.pipe().subscribe(obs => {
      this.userId = obs.get('id');
      if (this.userId) {
        this.isNewUser = false;
      }
    });

  }

  ngOnInit() {

    this.createUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, CustomValidators.ValidateEmail]),
      phone: new FormControl('', [CustomValidators.ValidatePhone]),
      role: new FormControl('', []),
      clientId: new FormControl(this.loggedInUser.clientId, []),
      assignedPortals: new FormControl('')
    });

    if(!this.isNewUser){
      this._userAccountService
    }


  }

  public createNewUser() {
    if (this.createUserForm.valid) {
      let newUser: UserAccountModel = <UserAccountModel>this.createUserForm.value;
      this._userAccountService.createUser(newUser).then(usr => console.log(usr)).catch(err => alert(err));
    }
  }

  public getPortals() {
    this._portalService.getAllPortals().then(porlats => this.portalList = porlats).catch(err => alert(err));
  }
}
