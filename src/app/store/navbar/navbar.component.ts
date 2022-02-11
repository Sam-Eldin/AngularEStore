import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseHelper} from "../../FirebaseHelper/firebase-helper.service";
import {ActiveToast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() username: string | null | undefined = '';

  constructor(private router: Router, private firestore: FirebaseHelper, private toaster: ToastrService) { }
  private currentToaster: ActiveToast<any> | undefined;

  ngOnInit(): void {
  }

  async handleSignOut() {
    try {
      this.currentToaster = this.toaster.info('Logging out');
      await new Promise(f => setTimeout(f, 1000));
      await this.firestore.logout();
      this.toaster.remove(this.currentToaster.toastId);
      this.toaster.success('Logged out successfully');
    } catch (e) {
      console.log(e);
      if (this.currentToaster) {
        this.toaster.remove(this.currentToaster.toastId);
      }
      this.toaster.error('Failed: ' + e);
    }
  }

}
