import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseHelper} from "../../FirebaseHelper/firebase-helper.service";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {ToastService} from "angular-toastify";
import AuthError = firebase.auth.AuthError;
import FirebaseError = firebase.FirebaseError;
import {ActiveToast, ToastrService} from "ngx-toastr";

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

  private currentToaster: ActiveToast<any> | undefined;
  constructor(private router: Router,
              private loginHandler: FirebaseHelper,
              private _toastService: ToastService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  changePage(toPage: 2 | 3) {
    this.pageNumber.emit(toPage);
  }

  async handleLogin() {
    try {
      console.log(`Logging in to account: ${this.email}`);
      this.currentToaster = this.toaster.info('Logging in... ');
      this.showProgressbar = true;
      this.userCred = await this.loginHandler.login(this.email, this.password);
      this.toaster.remove(this.currentToaster.toastId);
      this.toaster.success('Logged in successfully');
      // await this.router.navigateByUrl("/store");
    } catch (e: AuthError | FirebaseError | any) {
      console.log(e.code);
      if(this.currentToaster) {
        this.toaster.remove(this.currentToaster.toastId);
      }
      this.toaster.error('Invalid email/password');
    }
  }
}
