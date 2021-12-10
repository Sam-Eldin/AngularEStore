import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirebaseHelper} from "../../FirebaseHelper/firebase-helper.service";
import {ActiveToast, ToastrService} from "ngx-toastr";
import firebase from "firebase/compat";
import AuthError = firebase.auth.AuthError;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  strongPassword;
  mediumPassword;
  passwordStrength = 0;

  currentToaster: ActiveToast<any> | undefined;
  @Output() pageNumber = new EventEmitter<number>(true);

  constructor(private firebaseHelper: FirebaseHelper, private toaster: ToastrService) {
    this.strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    this.mediumPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  }

  ngOnInit(): void {

  }
  changePage(toPage: number) {
    this.pageNumber.emit(toPage);
  }

  async handleSignup() {
    try{
      if (this.password !== this.confirmPassword) {
        this.currentToaster = this.toaster.error('Passwords do not match');
        return;
      }
      this.currentToaster = this.toaster.info('Creating account');
      console.log(`Creating account with {${this.email}, ${this.password}`);
      await this.firebaseHelper.emailSignup(this.email, this.password);
      console.log('Successfully created the account');
      this.toaster.remove(this.currentToaster.toastId);
      this.currentToaster = this.toaster.success('Account been created');
      this.changePage(1);
    } catch (e: AuthError | any) {
      if(this.currentToaster) {
        this.toaster.remove(this.currentToaster.toastId);
      }
      console.log(e.code);
      switch (e.code) {
        case 'auth/invalid-email': this.toaster.error('Invalid email'); break;
        case 'auth/week-password': this.toaster.error('Week password'); break;
        case 'auth/email-already-in-use': this.toaster.error('Email already exist'); break;
      }
    }
  }

  passwordChange() {
    const progressbar = document.getElementById('passwordStrength');
    if(this.password === '') {
      this.passwordStrength = 0;
      return;
    }
    if (progressbar) {
      if(this.strongPassword.test(this.password)) {
        this.passwordStrength = 100;
        progressbar.className = `progress-bar bg-success`;
      } else if (this.mediumPassword.test(this.password)) {
        this.passwordStrength = 50;
        progressbar.className = `progress-bar bg-warning`;
      } else {
        this.passwordStrength = 25;
        progressbar.className = `progress-bar bg-danger`;
      }
    }
  }
}
