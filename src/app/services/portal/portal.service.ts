import { Injectable } from '@angular/core';
import { PortalModel } from 'src/app/models/portal.model';
import { AjaxService } from '../ajax/ajax.service';
import { ContentTypeModel } from 'src/app/models/content-type.model';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  private apiPrefix : string = 'portal/';

  constructor(private _ajaxService: AjaxService) { }

  public addNewPortal(portal: PortalModel): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.apiPrefix + 'setNewPortal.php',
        dataToSend: portal
      }).then(resp => {
        if (resp.status) {
          // this.parsePortalModel([resp.data]).then(newPortal => resolve(newPortal)).catch(err => reject(err));
          resolve(resp.msg);
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public getAllPortalsByClientId(clientId : string, userId : string): Promise<PortalModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'user_account/superadmin/getPortalListingByClientId.php',
        dataToSend : {
          clientId : clientId,
          userId : userId
        }
      }).then(data => {
        if (data.status) {
          this.parsePortalModel(data.data).then(portalList => {
            resolve(portalList);
          })
        }
        else {
          reject(data.msg);
        }
      }).catch(err => reject(err));
    });
  }
  public getAllPortals(): Promise<PortalModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.apiPrefix + 'getPortalListing.php',
      }).then(data => {
        if (data.status) {
          this.parsePortalModel(data.data).then(portalList => {
            resolve(portalList);
          })
        }
        else {
          reject(data.msg);
        }
      }).catch(err => reject(err));
    });
  }



  public getPortalById(portalId: string): Promise<PortalModel> {
    return new Promise((resolve, reject) => {

      this._ajaxService.Post({
        apiName: this.apiPrefix + 'getPortalById.php',
        dataToSend: {
          portalId: portalId
        }
      }).then(resp => {
        if (resp.status) {
          this.parsePortalModel([resp.data]).then(p => resolve(p[0]));
        }
        else {
          reject(resp.msg);
        }
      })
    })
  }

  public editPortalById(portal: PortalModel) {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.apiPrefix + 'editPortals.php',
        dataToSend: portal
      }).then(resp => {
        if (resp.status) {
          resolve(resp.msg);
        } else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public deletePortalById(portalId): Promise<string> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: this.apiPrefix + 'deletePortals.php',
        dataToSend: {
          portalId: portalId
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
  private parsePortalModel(portalData: any[]): Promise<PortalModel[]> {
    return new Promise(async (resolve, reject) => {

      let portalList: PortalModel[] = [];
      if (portalData && portalData.length > 0) {
        portalList = await Promise.all(portalData.map(p => {
          let _portal = new PortalModel();

          _portal.portalId = p.portalId;
          _portal.email = p.email;
          _portal.portalName = p.portalName;
          _portal.agreementTenure = parseInt(p.agreementTenure, 10);
          _portal.url = p.url;
          _portal.contentType = p.contentType.map(ct => new ContentTypeModel(ct.contentTypeId, ct.contentTypeName))
          return _portal;
        }));
      }

      resolve(portalList)

    });
  }
}
