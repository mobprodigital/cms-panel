import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAccountModel } from 'src/app/models/user-account.model';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-all-super-admins',
  templateUrl: './all-super-admins.component.html',
  styleUrls: ['./all-super-admins.component.css']
})
export class AllSuperAdminsComponent implements OnInit {


  public selectedClientId: string = '';
  public clientList: ClientModel[] = [];
  public noUserFoundMsg: string = 'No user found';
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  dataSource: MatTableDataSource<UserAccountModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _userAccountService: UserAccountService) {
    this.getClientList();
  }

  ngOnInit() {
  }


  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteSuperAdmin(clientid: string, userId: string) {
    this._userAccountService.deleteSuperAdmin(clientid, userId).then(msg => {
      let indexNumber = this.dataSource.data.findIndex(p => p.userId == userId);
      this.dataSource.data.splice(indexNumber, 1);
      this.dataSource = new MatTableDataSource<UserAccountModel>(this.dataSource.data);
      alert(msg);
    }).catch(err => alert(err));

  }

  public getClientList() {
    this._userAccountService.getAllClients().then(allClients => this.clientList = allClients).catch(err => alert(err));
  }

  public getAllSuperAdmins() {
    this._userAccountService.getAllSuperAdmins(this.selectedClientId).then(portals => {
      this.dataSource = new MatTableDataSource(portals);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => {
      alert(err);
      this.dataSource = null;
    });
  }


}
