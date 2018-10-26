import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VideoService } from 'src/app/services/video/video.service';
import { VideoCategoryModel } from 'src/app/models/video-category.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-video-category',
  templateUrl: './add-new-video-category.component.html',
  styleUrls: ['./add-new-video-category.component.css']
})
export class AddNewVideoCategoryComponent implements OnInit {

  public isNewCategory: boolean = true;
  public categoryForm: FormGroup;
  public categoryId: string = '';
  
  constructor(private _videoService: VideoService, private route: ActivatedRoute) {
    this.route.paramMap.pipe().subscribe(obs => {
      this.categoryId = obs.get('id');
      if (this.categoryId) {
        this.isNewCategory = false;
      }
    })
  }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
      categoryId: new FormControl('')
    });
    if (!this.isNewCategory) {
      this._videoService.getVideoCategoryById(this.categoryId).then(cat => {
        this.categoryForm.reset({
          categoryName: cat.categoryName,
          categoryId: cat.categoryId
        })
      });

    }
  }

  createVideoCategory() {
    if (this.categoryForm.valid) {
      let newVidCat: VideoCategoryModel = <VideoCategoryModel>this.categoryForm.value;
      if (this.isNewCategory) {
        this._videoService.createVideoCategory(newVidCat).then(msg => alert(msg)).catch(err => alert(err));
      } else {
        this._videoService.editVideoCategory(newVidCat).then(msg => alert(msg)).catch(err => alert(err));
      }
    }
  }

}
