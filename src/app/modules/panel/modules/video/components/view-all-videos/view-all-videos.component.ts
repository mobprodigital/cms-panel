import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-view-all-videos',
  templateUrl: './view-all-videos.component.html',
  styleUrls: ['./view-all-videos.component.css']
})
export class ViewAllVideosComponent implements OnInit {

  displayedColumns: string[] = ['title', 'portals', 'categories', 'action'];

  dataSource: MatTableDataSource<VideoModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.getAllVideos();
  }

  ngOnInit() {
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllVideos() {
    let videos: VideoModel[] = Array.from({ length: 5 }, (_, i) => {
      let v = new VideoModel();
      v.title = 'title' + (i + 1);
      v.categoryId = ['funny', 'science', 'sports'];
      v.portals = ['9xm', 'bsnl', 'discovery'];
      return v;
    })
    this.dataSource = new MatTableDataSource(videos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
