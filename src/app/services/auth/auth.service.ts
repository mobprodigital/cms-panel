import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AjaxService } from '../ajax/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _ajaxService: AjaxService) { }


  set isLoggedIn(loggedIn: boolean) {
    if (loggedIn) {
      localStorage.setItem('loggedIn', 'true');
    }
    else {
      localStorage.setItem('loggedIn', 'false');
    }
  }

  get isLoggedIn(): boolean {
    let _isLoggedin = localStorage.getItem('loggedIn');
    return _isLoggedin === 'true';
  };

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
      }).then(data => {
        if (data.status) {
          this.isLoggedIn = true;
          resolve(true);
        }
        else {
          this.isLoggedIn = false;
          reject(data.msg);
        }
      }).catch(err => {
        this.isLoggedIn = false;
        reject(err);
      });
    })


    /* return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    ); */
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
