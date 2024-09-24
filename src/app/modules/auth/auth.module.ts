import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailConfirmationPendingComponent } from './email-confirmation-pending/email-confirmation-pending.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailConfirmationPendingComponent,
    ForgottenPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class AuthModule { }
