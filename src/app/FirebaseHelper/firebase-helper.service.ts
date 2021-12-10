import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})
export class FirebaseHelper {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
  }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async emailResetPassword(email: string) {
    return await this.afAuth.sendPasswordResetEmail(email);
  }

  async emailSignup(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    try{
      console.log('Signing Out');
      await this.afAuth.signOut();
      await this.router.navigateByUrl('/');
      console.log('Signing Out Success');
    } catch (e) {
      console.log(e);
    }
  }
}
