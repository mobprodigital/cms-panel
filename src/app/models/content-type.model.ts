import { ContentTypeEnum } from "../enums/content-type.enum";

export class ContentTypeModel {
    constructor(public contentTypeId: ContentTypeEnum, public contentTypeName: string) { }
}