import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailConfirmationPendingComponent } from './email-confirmation-pending/email-confirmation-pending.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'emailConfirmationPending',
    component: EmailConfirmationPendingComponent
  },
  {
    path: 'forgottenPassword',
    component: ForgottenPasswordComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
