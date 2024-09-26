import {
  ActionCodeSettings,
  Auth,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential
  } from '@angular/fire/auth';
import { AlertService } from './alert.service';
import { FirebaseError } from 'firebase/app';
import { Injectable } from '@angular/core';
import {
  first,
  forkJoin,
  from,
  map,
  Observable,
  of,
  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private _auth: Auth,
    private _alertService: AlertService,
  ) { }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this._auth, email, password)).pipe(
      first()

    )
  }

  signIn(email: string, password: string) {
    return from(signInWithEmailAndPassword(this._auth, email, password)).pipe(
      first()
    )
  }

  signInWithGoogle() {
    return from(signInWithPopup(this._auth, new GoogleAuthProvider())).pipe(
      first()
    )
  }

  signInWithFacebook() {
    return from(signInWithPopup(this._auth, new FacebookAuthProvider())).pipe(
      first()
    )
  }

  signOut() {
    return from(signOut(this._auth)).pipe(
      first(),
    )
  }

  sendPasswordResetEmail(email:string){
    const actionCodeSettings:ActionCodeSettings = {
      url: 'http://localhost:4200/auth/resetPassword'
    }
    return from(sendPasswordResetEmail(this._auth,email,actionCodeSettings)).pipe(first())
  }


  sendEmailVerification() {
    const actionCodeSettings: ActionCodeSettings = {
      url: 'http://localhost:4200'
    }

    if (!this.user) return of(false)
    return from(sendEmailVerification(this.user, actionCodeSettings)).pipe(first())
  }

  isneededRedirect = (userCredential: UserCredential): Observable<boolean> => {
    if (userCredential.user.emailVerified) {
      return of<true>(true)
    } else {
      return forkJoin([
        this.sendEmailVerification(),
        this.signOut()
      ]).pipe(map(_ => false))

    }
  }

  apiError = (error: FirebaseError): Observable<'error'> => {
    console.log({ error })
    if (error.hasOwnProperty('message')) {
      const message = error.message
      this._alertService.addNewAlert(message, 'danger', error);
    }
    return of('error');
  }


  get user() { return this._auth.currentUser }
}
