import { Injectable } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { AjaxService } from "src/app/services/ajax/ajax.service";
import { UserAccountModel } from 'src/app/models/user-account.model';
import { AjaxResponse } from '../ajax/interface/ajax-response.interface';
import { UserRoleModel } from 'src/app/models/user-role.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private baseFolder: string = 'user_account/';
  private superAdminFolder: string = 'superadmin/';
  private clientFolder: string = 'client/';
  private userFolder: string = 'user/';

  constructor(private _ajaxService: AjaxService) { }



  //#region client

  public createClient(client: ClientModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.clientFolder + 'setNewClient.php',
        dataToSend: client
      }).then(resp => {
        if (resp.status) {
          // this.parseClientModel([resp.data]).then(client => resolve(client[0]));
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public editClient(client: ClientModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.clientFolder + 'editClientById.php',
        dataToSend: client
      }).then(resp => {
        if (resp.status) {
          // this.parseClientModel([resp.data]).then(client => resolve(client[0]));
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public getClientById(clientId: string): Promise<ClientModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.clientFolder + 'getClientById.php',
        dataToSend: {
          clientId: clientId
        }
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
        apiName: this.baseFolder + this.clientFolder + 'getClientListing.php'
      }).then(data => {
        this.parseClientModel(data.data).then(clients => {
          resolve(clients);
        });
      }).catch(err => reject(err));
    });
  }

  public deleteClient(clientId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.clientFolder + 'deleteClientById.php',
        dataToSend: {
          clientId: clientId
        }
      }).then(resp => {
        if (resp.status) {
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
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
        _client.billingCycle = c.billingCycle;
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


  //#endregion

  //#region user

  public createUser(userAccountModel: UserAccountModel): Promise<UserAccountModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.userFolder + 'setNewUser.php',
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

  public getAllUsers(userId: string, clientId: string): Promise<UserAccountModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.userFolder + 'getUserListing.php',
        dataToSend: {
          clientId: clientId,
          userId: userId
        }
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

  private parseUserAccountModel(userArr: any[]): Promise<UserAccountModel[]> {
    return new Promise((resolve, reject) => {
      let userList: UserAccountModel[] = [];
      if (userArr && userArr.length > 0) {
        userList = userArr.map(usr => {

          let _user = new UserAccountModel();
          _user.firstName = usr.firstName;
          _user.lastName = usr.lastName;
          _user.email = usr.email;
          _user.address = usr.address;
          _user.phone = usr.phone;
          _user.role = new UserRoleModel(usr.role.roleId, usr.role.roleName);
          _user.userId = usr.userId;
          _user.clientId = usr.clientId;
          if (usr.clientInfo) {
            let clInfo = new ClientModel();
            clInfo.clientName = usr.clientInfo.clientName;
            clInfo.clientId = usr.clientInfo.clientId;
            clInfo.email = usr.clientInfo.email;
            clInfo.phone = usr.clientInfo.phone;
            clInfo.skypeId = usr.clientInfo.skypeId;
            clInfo.agreementTenure = usr.clientInfo.agreementTenure;
            clInfo.billingCycle = usr.clientInfo.billingCycle;
            clInfo.assignedPortals = usr.clientInfo.assignedPortals;
            clInfo.address = usr.clientInfo.address;
            clInfo.domain = usr.clientInfo.domain;
            _user.clientInfo = clInfo;
          }
          _user.assignedPortals = usr.assignedPortals;

          return _user;

        });
      }
      resolve(userList);
    })
  }

  //#endregion

  //#region SuperAdmin

  public createSuperAdmin(superAdmin: UserAccountModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.superAdminFolder + 'createSuperadmin.php',
        dataToSend: superAdmin
      }).then(resp => {
        if (resp.status) {
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public editSuperAdmin(superAdmin: UserAccountModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.superAdminFolder + 'editSuperadminById.php',
        dataToSend: superAdmin
      }).then(resp => {
        if (resp.status) {
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public deleteSuperAdmin(clientId: string, userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.superAdminFolder + 'deleteSuperadminById.php',
        dataToSend: {
          clientId: clientId,
          userId: userId
        }
      }).then(resp => {
        if (resp.status) {
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public getSuperAdmin(clientId: string, userId: string): Promise<UserAccountModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.superAdminFolder + 'getSuperadminById.php',
        dataToSend: {
          clientId: clientId,
          userId: userId
        }
      }).then(resp => {
        if (resp.status) {
          this.parseUserAccountModel([resp.data]).then(sa => resolve(sa[0])).catch(err => reject(err));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public getAllSuperAdmins(clientId: string): Promise<UserAccountModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.baseFolder + this.superAdminFolder + 'getSuperadminListing.php',
        dataToSend: {
          clientId: clientId
        }
      }).then(resp => {
        if (resp.status) {
          this.parseUserAccountModel(resp.data).then(sa => resolve(sa)).catch(err => reject(err));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }


  //#endregion


}
