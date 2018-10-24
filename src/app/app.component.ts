import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserAccountService } from './services/user-account/user-account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* constructor(private router: Router, private user: UserAccountService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.user.loggedInUser && this.user.loggedInUser.clientId) {
          this.router.navigateByUrl('/panel/user-account/create-client');
        }
        else{
          this.router.navigateByUrl('/login/login');
        }
      }
    });
  } */
}
