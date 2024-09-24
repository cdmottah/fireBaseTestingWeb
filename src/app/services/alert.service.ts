import { Injectable } from '@angular/core';
import { Alert, alertType } from '@models/alert.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _alerts$ = new BehaviorSubject<Alert[]>([])
  alerts$ = this._alerts$.asObservable();
  constructor() {}

  addNewAlert(message: string, type: alertType, err?: any) {
    const alerts = this._alerts$.getValue();
    const newAlert: Alert = { message, id: this.getUniqueId(4), type }
    setTimeout(() => {
      this.removeAlert(newAlert.id);
    }, message.length * 200);
    if (err) console.error(err)
    alerts.push(newAlert)
    this._alerts$.next(alerts)
  }

  removeAlert(id: string) {
    const alerts = this._alerts$.getValue();
    const idToDrop = alerts.findIndex(res => res.id == id);
    if (idToDrop >= 0) alerts.splice(idToDrop, 1);
    this._alerts$.next(alerts)
  }


  /**
   * generate groups of 4 random characters
   * @example getUniqueId(1) : 607f
   * @example getUniqueId(2) : 95ca-361a
   * @example getUniqueId(4) : 6a22-a5e6-3489-896b
   */
  private getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}
