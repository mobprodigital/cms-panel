import { TextCategoryModel } from "./text-category.model";

export class TextModel {
    public textId: string = '';
    public title: string = '';
    public description: string = '';
    public categoryId: string[] = [];
    public portalId: string[] = [];
    public language: string = '';
    public city: string = '';
    public country: string = '';
    public author: string = '';
    public postTime: string = '';
    public tags: string = '';
    public thumbnail: string | ArrayBuffer = '';
}