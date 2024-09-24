import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.css'
})
export class ForgottenPasswordComponent {

  emailFormControl = new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true })

  constructor(private _authService: AuthService) { }

  sendPasswordResetEmail() {
    if (!this.emailFormControl.valid) {
      this.emailFormControl.markAllAsTouched();
      return;
    }
    this._authService.sendPasswordResetEmail(this.emailFormControl.value).subscribe()
  }
}
