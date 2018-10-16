import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { ClientModel } from 'src/app/models/client.model';
import { CustomValidators } from "src/app/custom-validators/custom-validators";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAccountModel } from 'src/app/models/user-account.model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public clientModel: ClientModel = new ClientModel();
  public createClientForm: FormGroup;
  public createUserForm: FormGroup;

  public showClientForm: boolean = true;
  public showUserForm: boolean = false;


  constructor(private _userAccountService: UserAccountService) { }

  ngOnInit() {
    this.createClientForm = new FormGroup({
      clientName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, CustomValidators.ValidateEmail]),
      domain: new FormControl('', [CustomValidators.ValidateUrl]),
      skypeId: new FormControl(''),
      billingCycle: new FormControl(''),
      phone: new FormControl('', [Validators.required, CustomValidators.ValidatePhone]),
      address: new FormControl('', [Validators.required]),
      agreementTenure: new FormControl('', [CustomValidators.ValidateUint]),
      assignedPortals: new FormControl('', [Validators.required]),
    });

    this.createUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, CustomValidators.ValidateEmail]),
      phone: new FormControl('', [CustomValidators.ValidatePhone]),
      role: new FormControl('', []),
      clientId: new FormControl('', []),
      assignedPortals: new FormControl('')
    });


  }

  public createNewClient() {
    if (this.createClientForm.valid) {
      this.clientModel = <ClientModel>this.createClientForm.value;
      this._userAccountService.createClient(this.clientModel).then(client => {

        this.createUserForm.controls['clientId'].setValue(client.clientId);
        this.createUserForm.controls['role'].setValue('superAdmin');
        this.createUserForm.controls['assignedPortals'].setValue(client.assignedPortals);
        
        console.log('newly created client ', client);

        this.showClientForm = false;
        this.showUserForm = true;
      }).catch(err => {
        alert(err);
      });
    }
  }

  public createNewUser() {
    if (this.createUserForm.valid) {
      let newUser: UserAccountModel = <UserAccountModel>this.createUserForm.value;
      this._userAccountService.createUser(newUser).then(usr => console.log(usr)).catch(err => alert(err));
    }
  }


}
