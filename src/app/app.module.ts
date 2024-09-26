import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';
import { AlertComponent } from "./shared/alert/alert.component";
import { AlertPipe } from './pipes/alert.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ModalComponent } from './shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    AlertPipe,
    FontAwesomeModule
],
  bootstrap: [AppComponent],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
})
export class AppModule { }
