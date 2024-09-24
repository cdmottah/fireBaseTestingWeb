import { Component } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '@services/alert.service';
import { AuthService } from '@services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  loginForm !: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _alertService: AlertService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  createAccount = () => {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    // Aquí puedes manejar el login, por ejemplo, enviar los datos a un servicio
    this._authService.register(email, password).pipe(
      switchMap(this._authService.isneededRedirect),
      catchError(this._authService.apiError)
    ).subscribe({
      next: this.redirect
    })

  }


  redirect = (redirect: boolean | 'error') => {
    if(redirect == 'error')return;
    this._router.navigate([(redirect) ? 'app' : 'auth/emailConfirmationPending'])
  }

}
