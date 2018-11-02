import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { VideoService } from 'src/app/services/video/video.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  constructor(
    private _videoService: VideoService, 
    private _authService: AuthService
    ) {
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
    this._videoService.getAllVideosByClientId(this._authService.loggedInUser.clientId).then(vids => {
      console.log(vids);
      this.dataSource = new MatTableDataSource(vids);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }).catch(err => alert(err));
  }

  public deleteVideo(videoId) {
    this._videoService.deleteVideoById(videoId).then(msg => {
      alert(msg);
      let vidIndex: number = this.dataSource.data.findIndex(v => v.videoId == videoId);
      this.dataSource.data.splice(vidIndex, 1);
      this.dataSource = new MatTableDataSource<VideoModel>(this.dataSource.data);
    }).catch(err => alert(err));
  }

}
