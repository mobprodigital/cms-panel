import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PortalService } from 'src/app/services/portal/portal.service';
import { TextService } from 'src/app/services/text/text.service';
import { PortalModel } from 'src/app/models/portal.model';
import { TextCategoryModel } from 'src/app/models/text-category.model';
import { ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UserAccountModel } from 'src/app/models/user-account.model';
import { AuthService } from 'src/app/services/auth/auth.service';




@Component({
  selector: 'app-add-new-text',
  templateUrl: './add-new-text.component.html',
  styleUrls: ['./add-new-text.component.css']
})
export class AddNewTextComponent implements OnInit {

  public isNewText: boolean = true;
  public textForm: FormGroup;
  public thumbnailUrl: string | ArrayBuffer;
  public coverImage: File = null;
  public defaultThumbnailUrl: string = 'assets/images/bg/no_image_found.png';
  public textId: string = '';
  public portalsList: PortalModel[] = [];
  public categoriesList: TextCategoryModel[] = [];
  public loggedInUser: UserAccountModel = new UserAccountModel();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tagList: string[] = [];

  
  @ViewChild('textFormControl') textFormControl: ElementRef;



  


  constructor(private _portalService: PortalService, private _textService: TextService, private activatedRoute: ActivatedRoute, private authService : AuthService) {
    this.loggedInUser = this.authService.loggedInUser;
    this.getPorlatsList();
    this.getTextCategories();

    this.activatedRoute.paramMap.pipe().subscribe(obs => {
      this.textId = obs.get('id');
      if (this.textId) {
        this.isNewText = false;
      }
    });


  }

  ngOnInit() {
    this.textForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      textId: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      postTime: new FormControl(''),
      categoryId: new FormControl('', [Validators.required]),
      portalId: new FormControl('', [Validators.required]),
      language: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      author: new FormControl(''),
      thumbnail: new FormControl(''),
      tags: new FormControl(''),
    });

    if (!this.isNewText) {
      this._textService.getTextById(this.textId).then(textModel => {
        this.textForm.reset({
          title: textModel.title,
          textId: textModel.textId,
          description: textModel.description,
          postTime: textModel.postTime,
          categoryId: textModel.categoryId,
          portalId: textModel.portalId,
          language: textModel.language,
          city: textModel.city,
          country: textModel.country,
          author: textModel.author,
          // thumbnail: textModel.thumbnail,
          // tags: textModel.tags,
        });
        if (textModel.thumbnail) {
          this.thumbnailUrl = textModel.thumbnail;
        }
        if (textModel.tags && textModel.tags.length > 0) {
          this.tagList = textModel.tags.split(',');
        }
      });
    }
  }

  public createText() {

    if (this.textForm.valid && this.tagList.length > 0) {

      let form: HTMLFormElement = this.textFormControl.nativeElement;
      let fdata = new FormData(form);

      fdata.append('title', this.textForm.controls['title'].value);
      fdata.append('textId', this.textForm.controls['textId'].value);
      fdata.append('description', this.textForm.controls['description'].value);
      fdata.append('postTime', this.textForm.controls['postTime'].value);
      fdata.append('categoryId', this.textForm.controls['categoryId'].value);
      fdata.append('portalId', this.textForm.controls['portalId'].value);
      fdata.append('language', this.textForm.controls['language'].value);
      fdata.append('city', this.textForm.controls['city'].value);
      fdata.append('country', this.textForm.controls['country'].value);
      fdata.append('author', this.textForm.controls['author'].value);
      fdata.append('thumbnail', this.coverImage);
      fdata.append('tags', this.tagList.join(','));

      if (this.isNewText) {
        this._textService.addText(fdata).then(msg => alert(msg)).catch(err => alert(err));
      }
      else {
        this._textService.editText(fdata).then(msg => alert(msg)).catch(err => alert(err));
      }
    }
  }

  public coverImageChange(ev: MouseEvent) {
    let files: FileList = ev.target['files'];
    if (files && files.length > 0) {
      let img = files[0];
      this.coverImage = img;
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.thumbnailUrl = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(img);
    }
    else {
      this.thumbnailUrl = '';
    }
  }

  public removeThumbnail() {
    this.textForm.controls['thumbnail'].reset();
    this.thumbnailUrl = '';
  }

  private getPorlatsList() {
    this._portalService.getAllPortalsByClientId(this.loggedInUser.clientId, this.loggedInUser.userId).then(ptls => { this.portalsList = ptls; }).catch(err => alert(err));
  }

  private getTextCategories() {
    this._textService.getAllTextCategories().then(cats => this.categoriesList = cats).catch(err => alert(err));
  }

  public resetTextForm() {
    // this.textForm.reset();
    this.tagList.length = 0;
    this.coverImage = null;
    this.thumbnailUrl = '';

  }
  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tagList.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tagList.indexOf(tag.trim());
    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
  }

  public setCategories(c1: any, c2: any) {
    return c1 && c2 ? c1 == c2 : false;
  }
  
  public setPortals(c1: any, c2: any) {
    return c1 && c2 ? c1 == c2 : false;
  }
}
