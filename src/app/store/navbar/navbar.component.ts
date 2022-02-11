import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseHelper} from "../../Utilites/firebase-helper.service";
import {ToasterHelperService, toasterTypes} from "../../Utilites/toaster-helper.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() username: string | null | undefined = '';

  constructor(private router: Router, private firestore: FirebaseHelper, private toaster: ToasterHelperService) { }

  ngOnInit(): void {
  }

  async handleSignOut() {
    try {
      this.toaster.createToaster(toasterTypes.info, 'Logging out');
      await new Promise(f => setTimeout(f, 1000));
      await this.firestore.logout();
      this.toaster.createToaster(toasterTypes.success, 'Logged out successfully');
    } catch (e) {
      this.toaster.createToaster(toasterTypes.error, 'Failed: ' + e);
    }
  }

}
