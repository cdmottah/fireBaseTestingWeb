import { AuthService } from '../../../services/auth.service';
import { catchError, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  faGoogle=faGoogle
  faFacebook=faFacebook

  loginForm !: FormGroup

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signInWithUserAndPassword = () => {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    // Aquí puedes manejar el login, por ejemplo, enviar los datos a un servicio
    this._authService.signIn(email, password).pipe(
      switchMap(this._authService.isneededRedirect),
      catchError(this._authService.apiError)
    ).subscribe({
      next: this.redirect
    })

  }

  signInWithGoogle = () => {
    this._authService.signInWithGoogle().pipe(
      switchMap(this._authService.isneededRedirect),
      catchError(this._authService.apiError)
    ).subscribe({
      next: this.redirect
    })
  }

  signInWithFacebook = () => {
    this._authService.signInWithFacebook().pipe(
      switchMap(this._authService.isneededRedirect),
      catchError(this._authService.apiError)
    ).subscribe({
      next: this.redirect
    })
  }

  redirect = (redirect: boolean | 'error') => {
    if (redirect == 'error') return;
    this._router.navigate([(redirect) ? 'app' : 'auth/emailConfirmationPending'])
  }



}
