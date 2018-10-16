import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';

@Component({
  selector: 'app-all-client',
  templateUrl: './all-client.component.html',
  styleUrls: ['./all-client.component.css']
})
export class AllClientComponent implements OnInit {

  displayedColumns: string[] = ['clientName', 'email', 'phone', 'action'];
  dataSource: MatTableDataSource<ClientModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _userAccountService: UserAccountService) {
    this.getAllClients();
  }



  ngOnInit() {
   
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllClients() {
    this._userAccountService.getAllClients().then(clients => {
      console.log(clients);
      this.dataSource = new MatTableDataSource(clients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }



}
