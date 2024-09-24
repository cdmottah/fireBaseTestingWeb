import {
  ActionCodeSettings,
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
  sendPasswordResetEmail
  } from '@angular/fire/auth';
import { AlertService } from './alert.service';
import {
  BehaviorSubject,
  first,
  forkJoin,
  from,
  map,
  Observable,
  of,
  tap
  } from 'rxjs';
import { FirebaseError } from 'firebase/app';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new BehaviorSubject<User | null>(null)
  constructor(
    private _auth: Auth,
    private _alertService: AlertService,
    private _userService: UserService
  ) { }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this._auth, email, password)).pipe(
      first(),
      tap((res) => { this.user$.next(res.user) })
    )
  }

  signIn(email: string, password: string) {
    return from(signInWithEmailAndPassword(this._auth, email, password)).pipe(
      first(),
      tap((res) => { this.user$.next(res.user) })
    )
  }

  signInWithGoogle() {
    return from(signInWithPopup(this._auth, new GoogleAuthProvider())).pipe(
      first(),
      tap((res) => { this.user$.next(res.user) })
    )
  }

  signInWithFacebook() {
    return from(signInWithPopup(this._auth, new FacebookAuthProvider())).pipe(
      first(),
      tap((res) => { this.user$.next(res.user) })
    )
  }

  signOut() {
    return from(signOut(this._auth)).pipe(
      first(),
      tap(res => {
        this._userService.user$.next(null);
      })
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
    const user = this.user$.getValue();
    if (!user) return of(false)
    return from(sendEmailVerification(user, actionCodeSettings)).pipe(first())
  }

  isneededRedirect = (userCredential: UserCredential): Observable<boolean> => {
    if (userCredential.user.emailVerified) {
      this._userService.user$.next(userCredential.user);
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
}
