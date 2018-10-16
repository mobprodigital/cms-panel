import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PortalModel } from 'src/app/models/portal.model';
import { PortalService } from 'src/app/services/portal/portal.service';

@Component({
  selector: 'app-all-portals',
  templateUrl: './all-portals.component.html',
  styleUrls: ['./all-portals.component.css']
})
export class AllPortalsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'url', 'action'];
  dataSource: MatTableDataSource<PortalModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _portalService: PortalService) {

    this._portalService.getAllPortals().then(portals => {
      this.dataSource = new MatTableDataSource(portals);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


  }

  ngOnInit() {

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
