import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-all-client',
  templateUrl: './all-client.component.html',
  styleUrls: ['./all-client.component.css']
})
export class AllClientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'action'];
  dataSource: MatTableDataSource<ClientModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor() {
    // Create 100 users
    const users = Array.from({ length: 5 }, (counter, i) => {
      let client: ClientModel = new ClientModel();
      client.id = i.toString();
      client.firstName = 'Client ' + (i + 1);
      client.email = `client${i + 1}@someclientdomain.com`;
      return client;
    });
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);


  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
