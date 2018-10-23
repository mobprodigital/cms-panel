import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax/ajax.service';
import { VideoModel } from 'src/app/models/video.model';
import { DataType } from '../ajax/enum/data-type.enum';
import { PortalModel } from 'src/app/models/portal.model';
import { VideoCategoryModel } from 'src/app/models/video-category.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videoApiFolderName: string = 'video/';

  constructor(private _ajaxService: AjaxService) { }

  public getAllVideosByClientId(clientId: string): Promise<VideoModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        dataToSend: {
          clientId: clientId
        },
        apiName: this.videoApiFolderName + 'getVideosByClientId.php',
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

  public getVideoById(videoId: string): Promise<VideoModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.videoApiFolderName + 'getVideoById.php',
        dataToSend: {
          videoId: videoId
        }
      }).then(resp => {
        if (resp.status) {
          this.parseVideo([resp.data]).then(vid => resolve(vid[0]));
        }
        else {
          reject(resp.msg);
        }
      })
    });
  }

  public addNewVideoMetaData(video: VideoModel): Promise<string> {
    return new Promise((resolve, reject) => {

      this._ajaxService.Post({
        apiName: this.videoApiFolderName + 'uploadVideoMetaData.php',
        dataToSend: video,
      }).then(resp => {
        if (resp.status) {
          // this.parseVideo([resp.data]).then(video => resolve(video[0]));
          resolve(resp.data);
        }
      })

    });

  }

  public editVideoMetaData(video: VideoModel): Promise<VideoModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.videoApiFolderName + '',
        dataToSend: video,
      }).then(resp => {
        if (resp.status) {
          this.parseVideo([resp.data]).then(video => resolve(video[0]));
        }
      })
    });

  }

  public uploadNewVideo(video: FormData): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.videoApiFolderName + 'uploadVideoFileById.php',
        dataToSend: video,
        dataType: DataType.FormData
      }).then(resp => {
        if (resp.status) {
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
        }
      })
    });

  }

  public editVideo(video: VideoModel): Promise<VideoModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.videoApiFolderName + '/',
        dataToSend: video,
      }).then(resp => {
        if (resp.status) {
          this.parseVideo([resp.data]).then(video => resolve(video[0]));
        }
      })
    });

  }

  public deleteVideoById(videoId): Promise<string> {
    return new Promise((res, rej) => {
      this._ajaxService.Post({
        apiName: this.videoApiFolderName + "deleteVideobyId.php",
        dataToSend: {
          videoId: videoId
        }
      }).then(resp => {
        if (resp.status) {
          res(resp.msg);
        }
        else {
          rej(resp.msg);
        }
      }).catch(err => rej(err));
    })
  }

  private parseVideo(videoArr: any[]): Promise<VideoModel[]> {
    return new Promise(async (resolve, reject) => {
      let videos: VideoModel[] = [];
      if (videoArr && videoArr.length > 0) {
        videos = await Promise.all(videoArr.map(async vid => {
          let _video = new VideoModel();
          _video.videoId = vid.videoId;
          _video.categoryId = vid.categoryId;
          _video.clientId = vid.clientId;
          _video.portalId = vid.portalId.map(p => {
            let _p = new PortalModel();
            _p.portalId = p.portalId;
            _p.portalName = p.portalName;
            _p.url = p.url;
            _p.url = p.url;
            _p.email = p.email;
            return _p;
          });
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

  public createVideoCategory(videoCategory: VideoCategoryModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.videoApiFolderName + 'setNewVideoCategory.php',
        dataToSend: videoCategory
      })
    });
  }

  public getAllVideoCategories(): Promise<VideoCategoryModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.videoApiFolderName + 'getVideoCategories.php',
      }).then(resp => {
        if (resp.status) {
          this.parseVideoCategory(resp.data).then(cats => {
            resolve(cats);
          })
        }
        else {
          reject(resp.msg);
        }
      })
    });
  }

  public getVideoCategoryById(videoCategoryId: string): Promise<VideoCategoryModel> {
    return new Promise((resolve, reject) => {

      this._ajaxService.Post({
        apiName: this.videoApiFolderName + 'getVideoCategoryById.php',
        dataToSend: {
          categoryId: videoCategoryId
        }
      }).then(resp => {
        if (resp.status) {
          this.parseVideoCategory([resp.data]).then(cats => {
            resolve(cats[0]);
          })
        }
        else {
          reject(resp.msg);
        }
      })
    });
  }

  public editVideoCategory(videoCategory: VideoCategoryModel): Promise<string> {
    return new Promise((resolve, reject) => {

      this._ajaxService.Post({
        apiName: this.videoApiFolderName + 'editVideoCategoryById.php',
        dataToSend: videoCategory
      }).then(resp => {
        if (resp.status) {
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public deleteVideoCategoryById(categoryId: string): Promise<string> {
    return new Promise((resolve, reject) => {

      this._ajaxService.Post({
        apiName: this.videoApiFolderName + 'deleteVideoCategoryById.php',
        dataToSend: {
          categoryId: categoryId
        }
      }).then(resp => {
        if (resp.status) {
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    })
  }

  private parseVideoCategory(videoCategoryArr: any[]): Promise<VideoCategoryModel[]> {
    return new Promise(async (resolve, reject) => {
      let vcat: VideoCategoryModel[] = [];
      if (videoCategoryArr && videoCategoryArr.length > 0) {
        try {
          vcat = await Promise.all(videoCategoryArr.map(async vc => new VideoCategoryModel(vc.categoryId, vc.categoryName)));
          resolve(vcat);
        }
        catch (err) {
          reject(err);
        }
      }
      else {
        resolve(vcat);
      }
    });
  }


}
