import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirebaseHelper} from "../../FirebaseHelper/firebase-helper.service";
import {ActiveToast, ToastrService} from "ngx-toastr";
import firebase from "firebase/compat";
import AuthError = firebase.auth.AuthError;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login/login.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  @Output() pageNumber = new EventEmitter<number>(true);

  currentToaster: ActiveToast<any> | undefined;
  constructor(private firebaseHelper: FirebaseHelper, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  async handleResetPassword() {
    try {
      this.currentToaster = this.toaster.info('Sending email...');
      console.log('Sending Email to ' + this.email);
      await this.firebaseHelper.emailResetPassword(this.email);
      this.toaster.remove(this.currentToaster.toastId);
      this.currentToaster = this.toaster.success('Email sent successfully');
      console.log('Email sent successfully');
      this.changePage(1);
    } catch (e: AuthError | any) {
      if(this.currentToaster){
        this.toaster.remove(this.currentToaster.toastId);
      }
      this.toaster.error(e.code);
    }
  }

  changePage(toPage: 1 | 2) {
    this.pageNumber.emit(toPage);
  }
}
