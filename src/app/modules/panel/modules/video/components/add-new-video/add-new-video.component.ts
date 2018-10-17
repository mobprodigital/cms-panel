import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-new-video',
  templateUrl: './add-new-video.component.html',
  styleUrls: ['./add-new-video.component.css']
})
export class AddNewVideoComponent implements OnInit {

  public addNewVideometaDataForm: FormGroup;
  public showMetaDataForm: boolean = true;
  public videoUploadForm: boolean = false;
  public uploadProgess: number = 40;
  constructor() { }

  ngOnInit() {

    this.addNewVideometaDataForm = new FormGroup({
      title: new FormControl(''),
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
      category: new FormControl(''),
      singer: new FormControl(''),
      country: new FormControl(''),
    })

  }

}
