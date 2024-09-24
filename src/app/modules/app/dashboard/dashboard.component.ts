import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '@services/alert.service';
import { SidebarService } from '@services/sidebar.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  loginForm !: FormGroup
  menuClass$: Observable<string>


  constructor(
    public sidebarService: SidebarService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _alertService: AlertService,
  ) {

    this.menuClass$ = this.sidebarService.isSideBarOpen$.pipe(map(res => (res) ? 'w-64' : 'w-16'))
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginWithUserAndPassword = () => {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }


    const { email, password } = this.loginForm.value;
    // Aquí puedes manejar el login, por ejemplo, enviar los datos a un servicio
    this._authService.signIn(email, password).subscribe({
      next: () => { },
      error: error => {
        if (typeof error == 'string') {
          this._alertService.addNewAlert(error, 'danger');
        }
        if (error.hasOwnProperty('error')) {
          const message = error.error.message
          this._alertService.addNewAlert(message, 'danger', error);
          return;
        }

      }
    })

  }

}
