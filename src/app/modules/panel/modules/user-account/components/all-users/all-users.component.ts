import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAccountModel } from 'src/app/models/user-account.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {


  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  dataSource: MatTableDataSource<UserAccountModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public loggedInUser: UserAccountModel = new UserAccountModel();
  

  constructor(private _userAccountService: UserAccountService, private authService: AuthService) {
    this.loggedInUser = this.authService.loggedInUser;
    this.getAllUsers();
    
  }

  ngOnInit() {
   
  }


  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  public getAllUsers() {
    this._userAccountService.getAllUsers(this.loggedInUser.userId, this.loggedInUser.clientId).then(users => {
      console.log('all users : ', users);
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
