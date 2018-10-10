import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PortalModel } from 'src/app/models/portal.model';

@Component({
  selector: 'app-all-portals',
  templateUrl: './all-portals.component.html',
  styleUrls: ['./all-portals.component.css']
})
export class AllPortalsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource: MatTableDataSource<PortalModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    const users = Array.from({ length: 5 }, (counter, i) => {
      let client: PortalModel = new PortalModel();
      client.portalId = i.toString();
      client.portalName = 'Portal ' + (i + 1);
      client.email = `portal${i + 1}@somedomain.com`;
      client.url = `somedomain${i + 1}.com`;
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
