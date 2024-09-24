import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-email-confirmation-pending',
  templateUrl: './email-confirmation-pending.component.html',

})
export class EmailConfirmationPendingComponent {
  isButtonDisabled: boolean = false;
  secondsLeft: number = 60;

  constructor(private _authService: AuthService) { }

  sendEmailAgain() {
    if (!this.isButtonDisabled) {
      this._authService.sendEmailVerification()
      this.isButtonDisabled = true;
      this.secondsLeft = 60;

      const interval = setInterval(() => {
        this.secondsLeft--;
        if (this.secondsLeft === 0) {
          clearInterval(interval);
          this.isButtonDisabled = false;
        }
      }, 1000);
    }
  }
}
