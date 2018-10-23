import { DataType } from "../enum/data-type.enum";

export interface AjaxRequestOptions {
    apiName: string;
    dataToSend?: any;
    dataType?: DataType;
    baseUrl?: string;
    progressReport?: boolean;
}