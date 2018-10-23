import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VideoModel } from 'src/app/models/video.model';
import { VideoService } from 'src/app/services/video/video.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { UserAccountModel } from 'src/app/models/user-account.model';
import { VideoFileModel } from 'src/app/models/video-file.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PortalService } from 'src/app/services/portal/portal.service';
import { PortalModel } from 'src/app/models/portal.model';
import { VideoCategoryModel } from 'src/app/models/video-category.model';


@Component({
  selector: 'app-add-new-video',
  templateUrl: './add-new-video.component.html',
  styleUrls: ['./add-new-video.component.css']
})
export class AddNewVideoComponent implements OnInit {
  public loggedInUser: UserAccountModel = new UserAccountModel();
  public addNewVideometaDataForm: FormGroup;
  public showMetaDataForm: boolean = true;
  public showVideoUploadForm: boolean = false;
  public uploadProgess: number = 40;
  public videoId: string = '';
  public portalList: PortalModel[] = [];
  public isNewVideo: boolean = true;
  public videoFileModel: VideoFileModel = new VideoFileModel();
  public videoCategories: VideoCategoryModel[] = [];


  @ViewChild('uploadVideoForm') uploadVideoForm: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private _videoService: VideoService,
    private _userAccountService: UserAccountService,
    private _portalService: PortalService,
  ) {
    this.activatedRoute.paramMap.pipe().subscribe(obs => {
      this.videoId = obs.get('id');
      if (this.videoId) {
        this.isNewVideo = false;
      }
    })
    this.loggedInUser = this._userAccountService.loggedInUser;
    alert(this.loggedInUser.clientId);
    this.videoFileModel.videoId = '2';
    this.getPortalList();
    this.getVideoCategoryList();
  }

  ngOnInit() {

    this.addNewVideometaDataForm = new FormGroup({
      title: new FormControl(''),
      clientId: new FormControl(parseInt(this.loggedInUser.clientId)),
      videoId: new FormControl(''),
      portalId: new FormControl(),
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
    });
    if (!this.isNewVideo) {
      this._videoService.getVideoById(this.videoId).then(vid => {
        console.log(vid);
        this.addNewVideometaDataForm.controls['title'].setValue(vid.title);
        this.addNewVideometaDataForm.controls['portalId'].setValue(vid.portalId);
        this.addNewVideometaDataForm.controls['language'].setValue(vid.language);
        this.addNewVideometaDataForm.controls['broadcasterName'].setValue(vid.broadcasterName);
        this.addNewVideometaDataForm.controls['description'].setValue(vid.description);
        this.addNewVideometaDataForm.controls['genere'].setValue(vid.genere);
        this.addNewVideometaDataForm.controls['director'].setValue(vid.director);
        this.addNewVideometaDataForm.controls['producer'].setValue(vid.producer);
        this.addNewVideometaDataForm.controls['writer'].setValue(vid.writer);
        this.addNewVideometaDataForm.controls['musicDirector'].setValue(vid.musicDirector);
        this.addNewVideometaDataForm.controls['productionHouse'].setValue(vid.productionHouse);
        this.addNewVideometaDataForm.controls['actor'].setValue(vid.actor);
        this.addNewVideometaDataForm.controls['singer'].setValue(vid.singer);
      })
    }
  }

  public addNewVideoMetaData() {
    if (this.addNewVideometaDataForm.valid) {
      let newVideo: VideoModel = <VideoModel>this.addNewVideometaDataForm.value;
      this._videoService.addNewVideoMetaData(newVideo).then(id => {
        console.log('new video id ', id);
        this.videoFileModel.videoId = id;
        this.showMetaDataForm = false;
        this.showVideoUploadForm = true;
      }
      ).catch(err => alert(err));
    }
  }

  public uploadVideo($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    let uploadForm: HTMLFormElement = <HTMLFormElement>this.uploadVideoForm.nativeElement;
    let videoData: FormData = new FormData(uploadForm);
    this._videoService.uploadNewVideo(videoData).then(msg => {
      alert(msg);
      this.route.navigateByUrl('/panel/video/all-videos');
    }).catch(err => alert(err));
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

  public onImageChange(ev: MouseEvent) {
    let InputFile = <HTMLInputElement>ev.target;
    let imageFile = InputFile.files.length > 0 ? InputFile.files[0] : null;
    if (imageFile) {
    }
  }

  public getPortalList() {
    this._portalService.getAllPortals().then(portals => this.portalList = portals);
  }

  public getVideoCategoryList(): void {
    this._videoService.getAllVideoCategories().then(cats => this.videoCategories = cats);
  }

  public portalComFun(p1: PortalModel, p2: PortalModel) {
    return p1 && p2 ? p1.portalId === p2.portalId : p1 === p2;
  }


}
