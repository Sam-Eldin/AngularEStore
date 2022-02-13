import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastContainerDirective, ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FirebaseHelper} from "../Utilites/firebase-helper.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularEStore';
  @ViewChild(ToastContainerDirective, {static: true})
  toastContainer: ToastContainerDirective | undefined;

  constructor(private router: Router,
              private firebaseHelper: FirebaseHelper,
              private toaster: ToastrService) {

  }

  ngOnInit(): void {
    this.toaster.overlayContainer = this.toastContainer;
  }
}
