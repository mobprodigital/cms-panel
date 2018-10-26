import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TextService } from 'src/app/services/text/text.service';
import { TextCategoryModel } from 'src/app/models/text-category.model';

@Component({
  selector: 'app-add-text-category',
  templateUrl: './add-text-category.component.html',
  styleUrls: ['./add-text-category.component.css']
})
export class AddTextCategoryComponent implements OnInit {

  public isNewCategory: boolean = true;
  public categoryForm: FormGroup;
  public categoryId: string = '';

  constructor(private _textService: TextService, private route: ActivatedRoute) {
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
      this._textService.getTextCetegoryById(this.categoryId).then(cat => {
        this.categoryForm.reset({
          categoryName: cat.categoryName,
          categoryId: cat.categoryId
        })
      });

    }
  }

  createTextCategory() {
    if (this.categoryForm.valid) {
      let newTextCat: TextCategoryModel = <TextCategoryModel>this.categoryForm.value;
      if (!this.isNewCategory) {
        this._textService.editTextCategory(newTextCat).then(msg => alert(msg)).catch(err => alert(err));
      } else {
        this._textService.addTextCategory(newTextCat).then(msg => alert(msg)).catch(err => alert(err));
      }
    }
  }

}
