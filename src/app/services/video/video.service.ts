import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax/ajax.service';
import { VideoModel } from 'src/app/models/video.model';
import { DataType } from '../ajax/enum/data-type.enum';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private _ajaxService: AjaxService) { }

  public getAllVideos(): Promise<VideoModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: '',
      }).then(resp => {
        if (resp.status) {
          this.parseVideo(resp.data).then(videos => resolve(videos));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    })
  }

  public addNewVideoMetaData(video: VideoModel): Promise<VideoModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: '',
        dataToSend: video,
      }).then(resp => {
        if (resp.status) {
          this.parseVideo([resp.data]).then(video => resolve(video[0]));
        }
      })
    });

  }
 
  public editVideoMetaData(video: VideoModel): Promise<VideoModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: '',
        dataToSend: video,
      }).then(resp => {
        if (resp.status) {
          this.parseVideo([resp.data]).then(video => resolve(video[0]));
        }
      })
    });

  }
  
  public uploadNewVideo(video: VideoModel): Promise<VideoModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: '',
        dataToSend: video,
      }).then(resp => {
        if (resp.status) {
          this.parseVideo([resp.data]).then(video => resolve(video[0]));
        }
      })
    });

  }
  public editVideo(video: VideoModel): Promise<VideoModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: '',
        dataToSend: video,
      }).then(resp => {
        if (resp.status) {
          this.parseVideo([resp.data]).then(video => resolve(video[0]));
        }
      })
    });

  }



  private parseVideo(videoArr: any[]): Promise<VideoModel[]> {
    return new Promise(async (resolve, reject) => {
      let videos: VideoModel[] = [];
      if (videoArr && videoArr.length > 0) {
        videos = await Promise.all(videoArr.map(async vid => {
          let _video = new VideoModel();
          _video.videoId = vid.videoId;
          _video.category = vid.categoryId;
          _video.clientId = vid.clientId;
          _video.portals = vid.portalId;
          _video.title = vid.title;
          _video.videoTags = vid.videoTags;
          _video.language = vid.language;
          _video.description = vid.description;
          _video.minAgeReq = vid.minAgeReq;
          _video.broadcasterName = vid.broadcasterName;
          _video.type = vid.type;
          _video.currentAvailability = vid.currentAvailability;
          _video.platform = vid.platform;
          _video.adult = vid.adult;
          _video.downloadRights = vid.downloadRights;
          _video.internationalRights = vid.internationalRights;
          _video.genere = vid.genere;
          _video.country = vid.country;
          _video.director = vid.director;
          _video.producer = vid.producer;
          _video.writer = vid.writer;
          _video.musicDirector = vid.musicDirector;
          _video.productionHouse = vid.productionHouse;
          _video.actor = vid.actor;
          _video.singer = vid.singer;

          return _video;
        }))
      }
      resolve(videos);
    })
  }

}
