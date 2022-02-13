import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseHelper} from "../../Utilites/firebase-helper.service";
import firebase from "firebase/compat";
import {ToasterHelper, toasterTypes} from "../../Utilites/toaster-helper.service";
import UserCredential = firebase.auth.UserCredential;
import AuthError = firebase.auth.AuthError;
import FirebaseError = firebase.FirebaseError;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  pages = 1 | 2 | 3;

  public showProgressbar = false;
  email: string = '';
  password: string = '';
  userCred: UserCredential | undefined;

  @Output() pageNumber = new EventEmitter<number>(true);


  constructor(private router: Router,
              private loginHandler: FirebaseHelper,
              private toaster: ToasterHelper) {
  }

  ngOnInit(): void {

  }

  changePage(toPage: 2 | 3) {
    this.pageNumber.emit(toPage);
  }

  async handleLogin() {
    try {
      this.toaster.createToaster(toasterTypes.info, 'Logging in... ');
      this.showProgressbar = true;
      await this.loginHandler.login(this.email, this.password);
      this.toaster.createToaster(toasterTypes.success, 'Logged in successfully');
      await this.router.navigateByUrl("/store");
    } catch (e: AuthError | FirebaseError | any) {
      this.toaster.createToaster(toasterTypes.error, 'Invalid email/password');
    }
  }
}
