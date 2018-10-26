import { Component, OnInit } from '@angular/core';
import { NavMenu } from 'src/app/models/nav-menu.model';
import { NavMenuItem } from 'src/app/models/nav-menu-item.model';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  menuList: NavMenu[] = [];
  constructor() {
    this.insertMenuItems();
  }

  ngOnInit() {
  }

  insertMenuItems() {
    this.menuList.push(...[
      new NavMenu('User Accounts', [
        new NavMenuItem('Add Client', '/panel/user-account/create-client'),
        new NavMenuItem('All Clients', '/panel/user-account/all-clients'),
        new NavMenuItem('Add User', '/panel/user-account/create-user'),
        new NavMenuItem('All Users', '/panel/user-account/all-users'),
      ], 'person'),
      new NavMenu('Portals', [
        new NavMenuItem('Add Portal', '/panel/portal/create-portal'),
        new NavMenuItem('All Portals', '/panel/portal/all-portals'),
      ], 'business'),
      new NavMenu('Video', [
        new NavMenuItem('Add Video', '/panel/video/add-video'),
        new NavMenuItem('All Videos', '/panel/video/all-videos'),
        new NavMenuItem('Add Video Category', '/panel/video/add-video-category'),
        new NavMenuItem('All Video Categories', '/panel/video/all-video-categories'),
      ], 'video_library'),
      new NavMenu('Text', [
        new NavMenuItem('Add Text', '/panel/text/add-text'),
        new NavMenuItem('All Texts', '/panel/text/all-texts'),
        new NavMenuItem('Add Text Category', '/panel/text/add-text-category'),
        new NavMenuItem('All Text Categories', '/panel/text/all-text-categories'),
      ], 'text_fields'),
    ])
  }

}
