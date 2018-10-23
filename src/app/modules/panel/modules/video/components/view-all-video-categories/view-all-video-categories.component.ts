import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoCategoryModel } from 'src/app/models/video-category.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { VideoService } from 'src/app/services/video/video.service';

@Component({
  selector: 'app-view-all-video-categories',
  templateUrl: './view-all-video-categories.component.html',
  styleUrls: ['./view-all-video-categories.component.css']
})
export class ViewAllVideoCategoriesComponent implements OnInit {

  displayedColumns: string[] = ['Category name', 'action'];
  dataSource: MatTableDataSource<VideoCategoryModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _videoService: VideoService) {
    this._videoService.getAllVideoCategories().then(vCats => {
      this.dataSource = new MatTableDataSource(vCats);
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

  public deleteCategory(categoryId) {
    this._videoService.deleteVideoCategoryById(categoryId).then(msg => {
      alert(msg);
      let indexNumber = this.dataSource.data.findIndex(p => p.categoryId == categoryId);
      this.dataSource.data.splice(indexNumber, 1);
      this.dataSource = new MatTableDataSource<VideoCategoryModel>(this.dataSource.data);
    }).catch(err => alert(err));

  }

  ngOnInit() {
  }

}
