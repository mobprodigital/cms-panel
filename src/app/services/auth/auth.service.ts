import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax/ajax.service';
import { Router } from '@angular/router';
import { UserAccountModel } from 'src/app/models/user-account.model';
import { UserRoleModel } from 'src/app/models/user-role.model';
import { ClientModel } from 'src/app/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private _ajaxService: AjaxService, private router: Router) { }

  public get loggedInUser(): UserAccountModel {
    let lgUser = JSON.parse(localStorage.getItem('loggedIn'));
    if (lgUser) {
      let logUser = this.parseUserAccountModel(lgUser);
      return logUser;
    } else{
      
    }

  }

  /* set isLoggedIn(loggedIn: boolean) {
    if (loggedIn) {
      localStorage.setItem('loggedIn', 'true');
    }
    else {
      localStorage.setItem('loggedIn', 'false');
    }
  } */

  get isLoggedIn(): boolean {
    let lgUser = JSON.parse(localStorage.getItem('loggedIn'));
    if (!lgUser) {
      return false;
    }
    let loggedInUser = this.parseUserAccountModel(lgUser);

    if (loggedInUser && loggedInUser.role.roleId && loggedInUser.userId) {
      return true;
    } else {
      return false;
    }

  };


  private parseUserAccountModel(usr: any): UserAccountModel {
    console.log('loggedInUser', usr);
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
  }


  /** The URL so we can redirect after logging in */
  redirectUrl: string = '/panel/';

  login(email: string, password: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'login.php',
        dataToSend: {
          email: email,
          password: password
        }
      }).then(resp => {
        if (resp.status) {
          console.log(resp.data);
          localStorage.setItem('loggedIn', JSON.stringify(resp.data));
          // this.isLoggedIn = true;
          resolve(true);
        }
        else {
          // this.isLoggedIn = false;
          reject(resp.msg);
        }
      }).catch(err => {
        // this.isLoggedIn = false;
        reject(err);
      });
    })


    /* return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    ); */
  }

  logout(): void {
    this._ajaxService.Post({
      apiName: 'logout.php'
    }).then(resp => {
      localStorage.clear();
      this.router.navigate(['/login/login']);
    }).catch(err => {
      localStorage.clear();
      this.router.navigate(['/login/login']);
    })

  }
}
