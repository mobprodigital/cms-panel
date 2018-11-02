import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PortalService } from 'src/app/services/portal/portal.service';
import { PortalModel } from 'src/app/models/portal.model';
import { CustomValidators } from 'src/app/custom-validators/custom-validators';
import { ActivatedRoute } from '@angular/router';
import { ContentTypeModel } from 'src/app/models/content-type.model';

@Component({
  selector: 'app-create-portal',
  templateUrl: './create-portal.component.html',
  styleUrls: ['./create-portal.component.css']
})
export class CreatePortalComponent implements OnInit {

  public createPortalForm: FormGroup;
  public isNewPortal: boolean = true;
  public portal: PortalModel = new PortalModel();
  public portalId: string = '';
  public contentTypeList: ContentTypeModel[] = [
    new ContentTypeModel('1', 'Audio'),
    new ContentTypeModel('2', 'Video'),
    new ContentTypeModel('3', 'Image'),
    new ContentTypeModel('4', 'Stories')
  ]
  constructor(private _portalService: PortalService, private route: ActivatedRoute) {
    this.route.paramMap.pipe().subscribe(obs => {
      this.portalId = obs.get('id');
      if (this.portalId) {
        this.isNewPortal = false;
      }
    })
  }

  private getPortalById(portalId: string) {
    this._portalService.getPortalById(portalId).then(p => {
      console.log(p);
      this.createPortalForm.reset({
        portalName : p.portalName,
        portalId : p.portalId,
        contentType : p.contentType,
        url : p.url,
        email : p.email,
        agreementTenure : p.agreementTenure,
      });

    }).catch(err => alert(err));
  }

  ngOnInit() {
    this.createPortalForm = new FormGroup({
      portalName: new FormControl('', [Validators.required]),
      portalId: new FormControl(''),
      contentType: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required, CustomValidators.ValidateUrl]),
      email: new FormControl('', [Validators.required, CustomValidators.ValidateEmail]),
      agreementTenure: new FormControl(''),
    });

    if (this.portalId) {
      this.getPortalById(this.portalId)
    }
  }

  public createPortal() {
    console.log(this.createPortalForm.value);
    
    if (this.createPortalForm.valid) {
      let p: PortalModel = this.createPortalForm.value;
      if (this.isNewPortal) {
        this._portalService.addNewPortal(p).then(msg => {
          alert(msg);
          this.createPortalForm.reset();
        }).catch(err => alert('Failed : ' + err));
      }
      else {
        this._portalService.editPortalById(p).then(msg => {
          alert(msg);

        }).catch(err => alert('Failed : ' + err));
      }

    }
  }

  public compareCtFun(c1 : any, c2 : ContentTypeModel){
    return c1 == c2.contentTypeId;
  }
  

}
