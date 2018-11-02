import { ContentTypeModel } from "./content-type.model";

export class PortalModel {
    public portalName: string = '';
    public portalId: string = '';
    public url: string = '';
    public email: string = '';
    public contentType: ContentTypeModel[] = [];
    public agreementTenure: number = null;
}