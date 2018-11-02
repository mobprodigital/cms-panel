import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { ClientModel } from 'src/app/models/client.model';
import { CustomValidators } from "src/app/custom-validators/custom-validators";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PortalModel } from 'src/app/models/portal.model';
import { PortalService } from 'src/app/services/portal/portal.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public clientModel: ClientModel = new ClientModel();
  public clientForm: FormGroup;
  public portalList: PortalModel[] = [];
  public showClientForm: boolean = true;
  public clientId: string = '';
  public isNewClient: boolean = true;

  constructor(
    private _userAccountService: UserAccountService,
    private activatedRoute: ActivatedRoute,
    private portalService: PortalService
  ) {

    this.getPortalList();

    this.activatedRoute.paramMap.pipe().subscribe(obs => {
      this.clientId = obs.get('id');
      if (this.clientId) {
        this.isNewClient = false;
      }
    });
  }

  ngOnInit() {
    this.clientForm = new FormGroup({
      clientName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, CustomValidators.ValidateEmail]),
      domain: new FormControl('', [CustomValidators.ValidateUrl]),
      skypeId: new FormControl(''),
      billingCycle: new FormControl(''),
      clientId: new FormControl('', []),
      phone: new FormControl('', [Validators.required, CustomValidators.ValidatePhone]),
      address: new FormControl('', [Validators.required]),
      agreementTenure: new FormControl('', [CustomValidators.ValidateUint]),
      assignedPortals: new FormControl('', [Validators.required]),
    });

    if (!this.isNewClient) {
      this._userAccountService.getClientById(this.clientId).then(client => {
        this.clientForm.reset({
          clientName: client.clientName,
          clientId: client.clientId,
          email: client.email,
          domain: client.domain,
          skypeId: client.skypeId,
          billingCycle: client.billingCycle,
          phone: client.phone,
          address: client.address,
          agreementTenure: client.agreementTenure,
          assignedPortals: client.assignedPortals,
        })
      }).catch(err => alert(err));
    }

  }

  public createNewClient() {
    if (this.clientForm.valid) {
      this.clientModel = <ClientModel>this.clientForm.value;

      // create new client
      if (this.isNewClient) {
        this._userAccountService.createClient(this.clientModel).then(msg => {
          alert(msg);
        }).catch(err => {
          alert(err);
        });
      }
      else {
        this._userAccountService.editClient(this.clientModel).then(msg => {
          alert(msg);
        })
      }


    }
  }



  public getPortalList() {
    this.portalService.getAllPortals().then(p => this.portalList = p).catch(err => alert(err));
  }

}
