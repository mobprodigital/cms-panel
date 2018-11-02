import { Component, OnInit } from '@angular/core';
import { NavMenu } from 'src/app/models/nav-menu.model';
import { NavMenuItem } from 'src/app/models/nav-menu-item.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserAccountModel } from 'src/app/models/user-account.model';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  loggedInUser: UserAccountModel = new UserAccountModel();
  menuList: NavMenu[] = [];
  constructor(private auth: AuthService) {
    this.loggedInUser = auth.loggedInUser;
    this.insertMenuItems();
  }

  ngOnInit() {
  }

  insertMenuItems() {




    if (this.loggedInUser.role.roleId == '1') { //if owner logged in
      let userAccountMenu: NavMenu = new NavMenu('User Accounts', [], 'person');
      userAccountMenu.menuItems.push(...[
        new NavMenuItem('Add Client', '/panel/user-account/create-client'),
        new NavMenuItem('All Clients', '/panel/user-account/all-clients'),
        new NavMenuItem('Add Super Admin', '/panel/user-account/create-superadmin'),
        new NavMenuItem('All Super Admins', '/panel/user-account/all-superadmins'),
      ]);
      this.menuList.push(userAccountMenu);
    }
    /* else if (this.loggedInUser.role.roleId == '2') {
      let userAccountMenu: NavMenu = new NavMenu('User Accounts', [], 'person');
      userAccountMenu.menuItems.push(...[
        new NavMenuItem('Add User', '/panel/user-account/create-user'),
        new NavMenuItem('All Users', '/panel/user-account/all-users'),
      ]);
      this.menuList.push(userAccountMenu);
    } */


    //if owner logged in
    if (this.loggedInUser.role.roleId == '1') {
      this.menuList.push(new NavMenu('Portals', [
        new NavMenuItem('Add Portal', '/panel/portal/create-portal'),
        new NavMenuItem('All Portals', '/panel/portal/all-portals'),
      ], 'business'));
    }
    else {
      this.menuList.push(...[
        new NavMenu('Video', [
          new NavMenuItem('Add Video', '/panel/video/add-video'),
          new NavMenuItem('All Videos', '/panel/video/all-videos'),
          new NavMenuItem('Add Video Category', '/panel/video/add-video-category'),
          new NavMenuItem('All Video Categories', '/panel/video/all-video-categories'),
        ], 'video_library'),
        new NavMenu('Story', [
          new NavMenuItem('Add Story', '/panel/text/add-text'),
          new NavMenuItem('All Stories', '/panel/text/all-texts'),
          new NavMenuItem('Add Story Category', '/panel/text/add-text-category'),
          new NavMenuItem('All Story Categories', '/panel/text/all-text-categories'),
        ], 'text_fields'),
      ])
    }

  }


  logOut() {
    this.auth.logout();
  }

}
