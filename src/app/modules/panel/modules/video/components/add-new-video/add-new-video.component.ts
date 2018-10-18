import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VideoModel } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video/video.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { UserAccountModel } from 'src/app/models/user-account.model';
import { VideoFileModel } from 'src/app/models/video-file.model';

@Component({
  selector: 'app-add-new-video',
  templateUrl: './add-new-video.component.html',
  styleUrls: ['./add-new-video.component.css']
})
export class AddNewVideoComponent implements OnInit {
  public loggedInUser: UserAccountModel = new UserAccountModel();
  public addNewVideometaDataForm: FormGroup;
  public showMetaDataForm: boolean = true;
  public videoUploadForm: boolean = false;
  public uploadProgess: number = 40;
  

  public videoFileModel: VideoFileModel = new VideoFileModel();

  @ViewChild('uploadVideoForm') uploadVideoForm: ElementRef;

  constructor(private _videoService: VideoService, private _userAccountService: UserAccountService) {
    this.loggedInUser = this._userAccountService.loggedInUser;
    this.videoFileModel.videoId = '2';
  }

  ngOnInit() {

    this.addNewVideometaDataForm = new FormGroup({
      title: new FormControl(''),
      clientId: new FormControl(parseInt(this.loggedInUser.clientId)),
      videoId: new FormControl(''),
      portalId: new FormControl(''),
      description: new FormControl(''),
      language: new FormControl(''),
      broadcasterName: new FormControl(''),
      type: new FormControl(''),
      platform: new FormControl(''),
      minAgeReq: new FormControl(''),
      currentAvailability: new FormControl(''),
      adult: new FormControl(''),
      downloadRights: new FormControl(''),
      internationalRights: new FormControl(''),
      genere: new FormControl(''),
      director: new FormControl(''),
      producer: new FormControl(''),
      writer: new FormControl(''),
      musicDirector: new FormControl(''),
      productionHouse: new FormControl(''),
      actor: new FormControl(''),
      categoryId: new FormControl(''),
      singer: new FormControl(''),
      country: new FormControl(''),
    })

  }

  public addNewVideoMetaData() {
    if (this.addNewVideometaDataForm.valid) {
      let newVideo: VideoModel = <VideoModel>this.addNewVideometaDataForm.value;
      console.log(newVideo);
      this._videoService.addNewVideoMetaData(newVideo).then(id => {
        console.log('new video id ', id);
        this.videoFileModel.videoId = id;
      }
      );
    }
  }

  public uploadVideo($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    let uploadForm: HTMLFormElement = <HTMLFormElement>this.uploadVideoForm.nativeElement;
    let videoData: FormData = new FormData(uploadForm);

    this._videoService.uploadNewVideo(videoData).then(msg => alert(msg));
  }

  public onVideoChange(ev: MouseEvent) {
    let InputFile = <HTMLInputElement>ev.target;
    let videoFile = InputFile.files.length > 0 ? InputFile.files[0] : null;
    if (videoFile) {
      this.videoFileModel.videoMime = videoFile.type;
      let videoNameSplit = videoFile.name.split('.');
      this.videoFileModel.extension = videoNameSplit[videoNameSplit.length - 1];
    }
    console.log(this.videoFileModel);
  }

}
