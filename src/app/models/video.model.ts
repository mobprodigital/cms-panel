import { PortalModel } from "./portal.model";

export class VideoModel {
    public title: string = "";
    public description: string = "";
    public language: string = "";
    public broadcasterName: string = "";
    public type: string = "";
    public platform: string = "";
    public minAgeReq: string = "";
    public currentAvailability: string = "";
    public adult: string = "";
    public downloadRights: string = "";
    public internationalRights: string = "";
    public genere: string = "";
    public portalId: PortalModel[] = [];
    public director: string = "";
    public producer: string = "";
    public writer: string = "";
    public musicDirector: string = "";
    public productionHouse: string = "";
    public actor: string = "";
    public categoryId: string[] = [];
    public singer: string = "";
    public country: string = "";
    public videoId: string;
    public clientId: string;
    public videoTags: string;
}