import { Injectable } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { AjaxService } from "src/app/services/ajax/ajax.service";
import { UserAccountModel } from 'src/app/models/user-account.model';
import { AjaxResponse } from '../ajax/interface/ajax-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private _ajaxService: AjaxService) {
    this._loggedInUser.firstName = localStorage.getItem('firstName');
    this._loggedInUser.lastName = localStorage.getItem('lastName');
    this._loggedInUser.assignedPortals = JSON.parse(localStorage.getItem('assignedPortals'));
    this._loggedInUser.email = localStorage.getItem('email');
    this._loggedInUser.phone = localStorage.getItem('phone');
    this._loggedInUser.role = localStorage.getItem('role');
    this._loggedInUser.userId = localStorage.getItem('userId');
    this._loggedInUser.clientId = localStorage.getItem('clientId');
  }


  private _loggedInUser: UserAccountModel = new UserAccountModel();

  public get loggedInUser(): UserAccountModel {
    return this._loggedInUser;
  }


  public createClient(client: ClientModel): Promise<ClientModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'setNewClient.php',
        dataToSend: client
      }).then(resp => {
        if (resp.status) {
          this.parseClientModel([resp.data]).then(client => resolve(client[0]));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public getAllClients(): Promise<ClientModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'getClientListing.php'
      }).then(data => {
        this.parseClientModel(data.data).then(clients => {
          resolve(clients);
        });
      }).catch(err => reject(err));
    });
  }

  public createUser(userAccountModel: UserAccountModel): Promise<UserAccountModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'setNewUser.php',
        dataToSend: userAccountModel
      }).then(resp => {
        if (resp.status) {
          this.parseUserAccountModel([resp.data]).then(user => resolve(user[0]));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }
  public getAllUsers(): Promise<UserAccountModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'getUserListing.php',
      }).then(resp => {
        if (resp.status) {
          this.parseUserAccountModel(resp.data).then(users => resolve(users));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }



  public login(email: string, password: string): Promise<AjaxResponse> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'login.php',
        dataToSend: {
          email: email,
          password: password
        }
      }).then(data => {
        if (data.status) {
          this.parseUserAccountModel([data.data]).then(logInUser => {
            let usr = logInUser[0];
            this._loggedInUser = usr;

            localStorage.setItem('firstName', usr.firstName);
            localStorage.setItem('lastName', usr.lastName);
            localStorage.setItem('assignedPortals', JSON.stringify(usr.assignedPortals));
            localStorage.setItem('email', usr.email);
            localStorage.setItem('phone', usr.phone);
            localStorage.setItem('role', usr.role);
            localStorage.setItem('userId', usr.userId);
            localStorage.setItem('clientId', usr.clientId);

          });
          resolve(data);
        }
        else {
          reject(data.msg);
        }
      }).catch(err => reject(err));
    })
  }

  private async parseClientModel(clientArr: any[]): Promise<ClientModel[]> {
    let clientList: ClientModel[] = [];
    if (clientArr && clientArr.length > 0) {
      clientList = await Promise.all(clientArr.map(async c => {
        let _client = new ClientModel();

        _client.clientName = c.clientName;
        _client.clientId = c.clientId;
        _client.email = c.email;
        _client.phone = c.phone;
        _client.skypeId = c.skypeId;
        _client.agreementTenure = c.agreementTenure;
        _client.assignedPortals = c.assignedPortals;
        _client.address = c.address;
        _client.domain = c.domain;

        return _client
      }));
    }

    return Promise.resolve(clientList);

  }

  private async parseUserAccountModel(userArr: any[]): Promise<UserAccountModel[]> {
    let userList: UserAccountModel[] = [];
    if (userArr && userArr.length > 0) {
      userList = await Promise.all(userArr.map(async usr => {
        let _user = new UserAccountModel();
        _user.firstName = usr.firstName;
        _user.lastName = usr.lastName;
        _user.email = usr.email;
        _user.phone = usr.phone;
        _user.role = usr.role;
        _user.userId = usr.userId;
        _user.clientId = usr.clientId;
        _user.assignedPortals = usr.assignedPortals;
        return _user;
      }));
    }
    return Promise.resolve(userList);
  }
}
