import { Injectable } from '@angular/core';
import { AjaxService } from '../ajax/ajax.service';
import { TextModel } from 'src/app/models/text.model';
import { TextCategoryModel } from 'src/app/models/text-category.model';
import { DataType } from '../ajax/enum/data-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TextService {


  private prefix: string = 'text/';

  constructor(private _ajaxService: AjaxService) { }

  //#region TextModel

  public addText(newText: FormData): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'uploadTextMetaData.php',
        dataToSend: newText,
        dataType: DataType.FormData
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

  public editText(text: FormData): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'editTextMetaDataById.php',
        dataToSend: text,
        dataType: DataType.FormData
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

  public getTextById(textId: string): Promise<TextModel> {


    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'getTextById.php',
        dataToSend: { textId: textId }
      }).then(resp => {
        if (resp.status) {
          this.parseTextModel([resp.data]).then(text => resolve(text[0])).catch(err => reject(err));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });



  }

  public deleteTextById(textId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'deleteTextById.php',
        dataToSend: {
          textId: textId
        }
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

  public getAllTexts(clientId : string): Promise<TextModel[]> {

    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'getTextsListingByClientId.php',
        dataToSend : {
          clientId : clientId
        }
      }).then(resp => {
        if (resp.status) {
          this.parseTextModel(resp.data).then(text => resolve(text)).catch(err => reject(err));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });


  }

  private parseTextModel(textArr: any[]): Promise<TextModel[]> {
    return new Promise(async (resolve, reject) => {
      let textArray: TextModel[] = [];
      try {

        if (textArr && textArr.length > 0) {
          textArray = await Promise.all(textArr.map(async t => {
            let _text = new TextModel();
            _text.textId = t['textId'];
            _text.title = t['title'];
            _text.tags = (t['tags'] && t['tags'].length > 0) ? t['tags'] : '';
            _text.description = t['description'];
            _text.categoryId = t['categoryId'];
            _text.portalId = t['portalId'] && t['portalId'].length ? t['portalId'].map(pt => pt.portalId) : [];
            _text.language = t['language'];
            _text.city = t['city'];
            _text.postTime = t['postTime'];
            _text.country = t['country'];
            _text.author = t['author'];
            _text.thumbnail = t['thumbnail'];
            return _text;
          }))
        }
        resolve(textArray);
      }
      catch (err) {
        reject(err);
      }
    })
  }

  //#endregion

  //#region TextCategoryModel


  public getAllTextCategories(): Promise<TextCategoryModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'getTextCategories.php'
      }).then(resp => {
        if (resp.status) {
          this.parseTextCategoryModel(resp.data).then(text => resolve(text)).catch(err => reject(err));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public editTextCategory(textCategory: TextCategoryModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'editTextCategoryById.php',
        dataToSend: textCategory
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

  public deleteTextCategory(textCategoryId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'deleteTextCategoryById.php',
        dataToSend: { categoryId: textCategoryId }
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

  public getTextCetegoryById(textCategoryId: string): Promise<TextCategoryModel> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'getTextCategoryById.php',
        dataToSend: { categoryId: textCategoryId }
      }).then(resp => {
        if (resp.status) {
          this.parseTextCategoryModel([resp.data]).then(text => resolve(text[0])).catch(err => reject(err));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }


  public addTextCategory(textCategory: TextCategoryModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.prefix + 'setNewTextCategory.php',
        dataToSend: textCategory,
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



  private parseTextCategoryModel(textCatArr: any[]): Promise<TextCategoryModel[]> {
    return new Promise(async (resolve, reject) => {
      let textCatArray: TextCategoryModel[] = [];
      try {

        if (textCatArr && textCatArr.length > 0) {
          textCatArray = await Promise.all(textCatArr.map(async t => new TextCategoryModel(t['categoryId'], t['categoryName'])));
        }
        resolve(textCatArray);
      }
      catch (err) {
        reject(err);
      }
    })
  }

  //#endregion

}
