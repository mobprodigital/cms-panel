import { Injectable, isDevMode } from '@angular/core';
import { Http, RequestOptions, RequestMethod } from '@angular/http';
import { DataType } from './enum/data-type.enum';
import { AjaxResponse } from './interface/ajax-response.interface';
import { AjaxRequestOptions } from './interface/ajax-request-options.interface';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  private _baseUrl: string = 'http://192.168.0.7/boogletv/api/dashboard/';

  constructor(private _http: Http) { }

  private Send(apiName: string, requestMethod: RequestMethod, data?: any, dataType: DataType = DataType.RowData, baseUrl?: string): Promise<AjaxResponse> {
    return new Promise((resolve, reject) => {

      let _requestOptions = new RequestOptions();

      let fullApiPath = baseUrl ? baseUrl + apiName : this._baseUrl + apiName;
      let _dataToSend: any = data;
      if (_dataToSend != null && _dataToSend != undefined) {
        if (dataType == DataType.RowData) {
          _dataToSend = JSON.stringify(data);
        }
        _requestOptions.body = _dataToSend;
      }

      _requestOptions.method = requestMethod;
      let _ajaxResponse: AjaxResponse = {
        data: null,
        msg: '',
        status: true,
        httpInfo: {
          ok: true,
          status: 200,
          statusText: 'OK',
          url: ''
        }
      };

      this._http.request(fullApiPath, _requestOptions).subscribe(response => {

        

        let responseData: any = response.json();

        // feed api data
        _ajaxResponse.data = responseData.data;
        _ajaxResponse.msg = responseData.message;
        _ajaxResponse.status = responseData.status === true;


        //feed http request data
        _ajaxResponse.httpInfo.ok = response.ok;
        _ajaxResponse.httpInfo.status = response.status;
        _ajaxResponse.httpInfo.statusText = response.statusText;
        _ajaxResponse.httpInfo.url = response.url;
        console.log('Status code success: ', _ajaxResponse.httpInfo);

        resolve(_ajaxResponse);
      }, (err: Response) => {
        _ajaxResponse.status = false;
        _ajaxResponse.httpInfo.ok = err.ok;
        _ajaxResponse.httpInfo.status = err.status;
        _ajaxResponse.httpInfo.statusText = err.statusText;
        _ajaxResponse.httpInfo.url = err.url;

        console.log('Status code error: ', _ajaxResponse.httpInfo);

        if (isDevMode) {

        }
        else {

        }

        reject(_ajaxResponse.httpInfo.statusText);
      });
    });
  }

  /**
   * Send a http request using POST method
   */
  public Post(ajaxRequestOptions: AjaxRequestOptions): Promise<AjaxResponse> {
    return this.Send(
      ajaxRequestOptions.apiName,
      RequestMethod.Post,
      ajaxRequestOptions.dataToSend,
      ajaxRequestOptions.dataType,
      ajaxRequestOptions.baseUrl
    );
  }

  /**
   * Send a http request using GET method
   */
  public Get(ajaxRequestOptions: AjaxRequestOptions): Promise<AjaxResponse> {
    return this.Send(
      ajaxRequestOptions.apiName,
      RequestMethod.Get,
      ajaxRequestOptions.dataToSend,
      ajaxRequestOptions.dataType,
      ajaxRequestOptions.baseUrl
    );
  }

  /**
   * Send a http request using PUT method
   */
  public Put(ajaxRequestOptions: AjaxRequestOptions): Promise<AjaxResponse> {
    return this.Send(
      ajaxRequestOptions.apiName,
      RequestMethod.Put,
      ajaxRequestOptions.dataToSend,
      ajaxRequestOptions.dataType,
      ajaxRequestOptions.baseUrl
    );
  }

  /**
   * Send a http request using DELETE method
   */
  public Delete(ajaxRequestOptions: AjaxRequestOptions): Promise<AjaxResponse> {
    return this.Send(
      ajaxRequestOptions.apiName,
      RequestMethod.Delete,
      ajaxRequestOptions.dataToSend,
      ajaxRequestOptions.dataType,
      ajaxRequestOptions.baseUrl
    );
  }

}
