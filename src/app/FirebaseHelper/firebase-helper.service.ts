import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FirebaseHelper {

  public user: firebase.User | undefined | null;
  public firebaseAuth: firebase.auth.Auth | undefined;
  public firebaseApp: firebase.app.App | undefined;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.firebaseApp = firebase.initializeApp(environment.firebase);
    this.firebaseAuth = this.firebaseApp.auth();
    this.firebaseAuth?.onAuthStateChanged((user) => {
      if (user) {
        console.log('Logged in');
        this.user = user;
      } else {
        console.log('something else');
        this.user = null;
      }
    });
  }

  async login(email: string, password: string) {
    try {
      await this.firebaseAuth?.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(async () => {
        console.log('logged in');
        await this.firebaseAuth?.signInWithEmailAndPassword(email, password);
        this.user = this.firebaseAuth?.currentUser;
        console.log(this.firebaseAuth?.currentUser);
      });
    } catch (e) {
      throw new Error('Failed to sign in: ' + e);
    }
  }

  async emailResetPassword(email: string) {
    await this.afAuth.sendPasswordResetEmail(email);
  }

  async emailSignup(email: string, password: string) {
    await this.firebaseAuth?.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    try {
      console.log('Signing Out');
      await this.afAuth.signOut();
      await this.router.navigateByUrl('');
      console.log('Signing Out Success');
    } catch (e) {
      console.log(e);
    }
  }

  async changePassword(oldPass: string, newPass: string) {
    if (this.firebaseAuth && this.firebaseAuth.currentUser && this.user && this.user.email) {
      const provider = firebase.auth.EmailAuthProvider.credential(this.user.email, oldPass);
      await this.firebaseAuth.currentUser.reauthenticateWithCredential(provider);
      await this.user.updatePassword(newPass);
    }
  }
}
