import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FirebaseHelper} from "../FirebaseHelper/firebase-helper.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private firestore: FirebaseHelper,private toaster: ToastrService) { }

  ngOnInit(): void {
  }

}
