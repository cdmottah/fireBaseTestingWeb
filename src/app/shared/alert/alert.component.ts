
import { Component } from '@angular/core';
import { AlertService } from '@services/alert.service';
import { faClose, faInfo } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  readonly faClose = faClose
  readonly faInfo=faInfo
  readonly alerts$

  constructor(private _alertService: AlertService) {
    this.alerts$ = this._alertService.alerts$
  }

  removeAlert(id: string) { this._alertService.removeAlert(id) }

}
