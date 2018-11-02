import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
// import { UserAccountService } from './services/user-account/user-account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private router : Router) {
    if (this.authService.isLoggedIn) {
      // this.router.navigate(['/panel/'])
    }else{
      this.authService.logout();
    }
  }
}
