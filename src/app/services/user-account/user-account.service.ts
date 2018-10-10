import { Injectable } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { AjaxService } from "src/app/services/ajax/ajax.service";
import { UserAccountModel } from 'src/app/models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private _ajaxService: AjaxService) { }

  public createClient(client: ClientModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: '',
        dataToSend: client
      }).then(resp => {
        if (resp.responseCode === 1) {
          resolve(resp.data);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public createUser(userAccountModel: UserAccountModel) {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: '',
        dataToSend: userAccountModel
      }).then(resp => {
        if (resp.responseCode === 1) {
          resolve(resp.data);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  private parseUserAccountModel(userArr: any[]) {

  }
}
