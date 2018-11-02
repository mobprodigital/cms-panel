import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAccountModel } from 'src/app/models/user-account.model';
import { PortalModel } from 'src/app/models/portal.model';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { PortalService } from 'src/app/services/portal/portal.service';
import { CustomValidators } from 'src/app/custom-validators/custom-validators';
import { ClientModel } from 'src/app/models/client.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-super-admin',
  templateUrl: './create-super-admin.component.html',
  styleUrls: ['./create-super-admin.component.css']
})
export class CreateSuperAdminComponent implements OnInit {

  superAdminForm: FormGroup;
  public clientId: string = '';
  public userId: string = '';
  public clientList: ClientModel[] = [];
  public portalList: PortalModel[] = [];
  public isNewSuperAdmin: boolean = true;


  constructor(
    private _userAccountService: UserAccountService,
    private _portalService: PortalService,
    private route: ActivatedRoute
  ) {

    this.route.paramMap.pipe().subscribe(obs => {
      this.clientId = obs.get('clientId');
      this.userId = obs.get('userId');
      if (this.clientId && this.userId) {
        this.isNewSuperAdmin = false;
      }

    });
    this.getClients();
    if(!this.isNewSuperAdmin){
      this.getPortalsByClient(this.clientId);
    }
  }

  ngOnInit() {

    this.superAdminForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, CustomValidators.AlphabetsWithSpace]),
      lastName: new FormControl('', [CustomValidators.AlphabetsWithSpace]),
      email: new FormControl('', [Validators.required, CustomValidators.ValidateEmail]),
      phone: new FormControl('', [CustomValidators.ValidatePhone]),
      role: new FormControl('2'),
      clientId: new FormControl(this.clientId, [Validators.required]),
      assignedPortals: new FormControl('', [Validators.required]),
      userId: new FormControl(this.userId)
    });


    if (!this.isNewSuperAdmin) {
      this._userAccountService.getSuperAdmin(this.clientId, this.userId).then(sa => {

        this.superAdminForm.reset({
          firstName: sa.firstName,
          lastName: sa.lastName,
          email: sa.email,
          phone: sa.phone,
          role: sa.role.roleId,
          clientId: sa.clientId,
          assignedPortals: sa.assignedPortals,
          userId: sa.userId,
        });


      }).catch(err => alert(err));

    }

  }

  public createSuperAdmin() {
    if (this.superAdminForm.valid) {
      let newSP: UserAccountModel = <UserAccountModel>this.superAdminForm.value;
      console.log(newSP);
      if (this.isNewSuperAdmin) {
        this._userAccountService.createSuperAdmin(newSP).then(msg => alert(msg)).catch(err => alert(err));
      } else {
        this._userAccountService.editSuperAdmin(newSP).then(usr => alert(usr)).catch(err => alert(err));
      }
    }
  }

  public getClients() {
    this._userAccountService.getAllClients().then(porlats => this.clientList = porlats).catch(err => alert(err));
  }

  public getPortalsByClient(clid?: string) {
    this._portalService.getAllPortalsByClientId((!!clid ? clid : this.clientId), this.userId).then(porlats => this.portalList = porlats).catch(err => alert(err));
  }

}
