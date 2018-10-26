import { Component, OnInit, ViewChild } from '@angular/core';
import { TextCategoryModel } from 'src/app/models/text-category.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TextService } from 'src/app/services/text/text.service';

@Component({
  selector: 'app-all-text-categories',
  templateUrl: './all-text-categories.component.html',
  styleUrls: ['./all-text-categories.component.css']
})
export class AllTextCategoriesComponent implements OnInit {


  displayedColumns: string[] = ['categoryName', 'action'];
  dataSource: MatTableDataSource<TextCategoryModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _textService: TextService) {

    this._textService.getAllTextCategories().then(textCats => {
      console.log(textCats); 
      this.dataSource = new MatTableDataSource(textCats);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteCategory(textId) {
    this._textService.deleteTextCategory(textId).then(msg => {
      alert(msg);
      let indexNumber = this.dataSource.data.findIndex(p => p.categoryId == textId);
      this.dataSource.data.splice(indexNumber, 1);
      this.dataSource = new MatTableDataSource<TextCategoryModel>(this.dataSource.data);
    }).catch(err => alert(err));

  }

  ngOnInit() {
  }

}
