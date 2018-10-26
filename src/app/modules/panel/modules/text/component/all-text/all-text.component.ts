import { Component, OnInit, ViewChild } from '@angular/core';
import { TextService } from 'src/app/services/text/text.service';
import { TextModel } from 'src/app/models/text.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PortalModel } from 'src/app/models/portal.model';

@Component({
  selector: 'app-all-text',
  templateUrl: './all-text.component.html',
  styleUrls: ['./all-text.component.css']
})
export class AllTextComponent implements OnInit {

  displayedColumns: string[] = ['title', 'language', 'author', 'action'];
  dataSource: MatTableDataSource<TextModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _textService: TextService) {
    this._textService.getAllTexts().then(portals => {
      this.dataSource = new MatTableDataSource(portals);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => alert(err));
  }

  ngOnInit() {
  }


  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteText(textId) {
    this._textService.deleteTextById(textId).then(msg => {
      alert(msg);
      let indexNumber = this.dataSource.data.findIndex(p => p.textId == textId);
      this.dataSource.data.splice(indexNumber, 1);
      this.dataSource = new MatTableDataSource<TextModel>(this.dataSource.data);
    }).catch(err => alert(err));

  }

}
