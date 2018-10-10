import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  constructor(private _userAccountService : UserAccountService) { }

  ngOnInit() {
  }

  public createNewClient(){
    this._userAccountService.createClient(new ClientModel()).catch();
  }

}
