import { Component, OnInit } from '@angular/core';
import { UserAccountModel } from 'src/app/models/user-account.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  public userList: UserAccountModel[] = Array.from({ length: 5 }, (counter, i) => {
    let user: UserAccountModel = new UserAccountModel();
    user.id = i.toString();
    user.firstName = 'User ' + (i + 1);
    user.email = `username${i + 1}@mail.com`;
    return user;
  });
  constructor() { }

  ngOnInit() {
  }

}
