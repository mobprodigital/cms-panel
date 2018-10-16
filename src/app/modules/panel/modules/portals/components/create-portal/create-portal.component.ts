import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PortalService } from 'src/app/services/portal/portal.service';
import { PortalModel } from 'src/app/models/portal.model';
import { CustomValidators } from 'src/app/custom-validators/custom-validators';

@Component({
  selector: 'app-create-portal',
  templateUrl: './create-portal.component.html',
  styleUrls: ['./create-portal.component.css']
})
export class CreatePortalComponent implements OnInit {

  public createPortalForm: FormGroup;
  constructor(private _portalService: PortalService) { }

  ngOnInit() {
    this.createPortalForm = new FormGroup({
      portalName: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required, CustomValidators.ValidateUrl]),
      email: new FormControl('', [Validators.required, CustomValidators.ValidateEmail]),
    });
  }

  public createPortal() {
    if (this.createPortalForm.valid) {
      let p: PortalModel = this.createPortalForm.value;

      this._portalService.createPortal(p).then()
    }
  }

}
