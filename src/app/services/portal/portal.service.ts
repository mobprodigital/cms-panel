import { Injectable } from '@angular/core';
import { PortalModel } from 'src/app/models/portal.model';
import { AjaxService } from '../ajax/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private _ajaxService: AjaxService) { }

  public createPortal(portal: PortalModel) {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'setNewPortal.php',
        dataToSend: portal
      }).then(resp => {
        if (resp) {
          this.parsePortalModel([resp.data]).then(newPortal => resolve(newPortal)).catch(err => reject(err));
        }
        else {
          reject(resp.msg);
        }
      }).catch(err => reject(err));
    });
  }

  public getAllPortals(): Promise<PortalModel[]> {
    return new Promise((resolve, reject) => {
      this._ajaxService.Post({
        apiName: 'getPortalListing.php',
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


  private parsePortalModel(portalData: any[]): Promise<PortalModel[]> {
    return new Promise(async (resolve, reject) => {

      let portalList: PortalModel[] = [];
      if (portalData && portalData.length > 0) {
        portalList = await Promise.all(portalData.map(p => {
          let _portal = new PortalModel();
          _portal.portalId = p.portalId;
          _portal.email = p.email;
          _portal.portalName = p.portalName;
          _portal.url = p.url;

          return _portal;
        }));
      }

      resolve(portalList)

    });
  }
}
