import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FirebaseHelper} from "../FirebaseHelper/firebase-helper.service";
import {product} from "./item/item.component";
import {Router} from "@angular/router";


const testProduct: product = {name: 'vodka', description: 'good stuff'.repeat(10), price: 15, quantity: 10};

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public products: Array<product> = [];
  constructor(private router: Router, private firestore: FirebaseHelper, private toaster: ToastrService) {
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
    this.products.push(testProduct);
  }

  async ngOnInit() {
    const rc = await this.firestore.isLoggedIn();
    if(!rc) {
      await this.router.navigateByUrl('');
    }
  }

  async handleSignOut() {
    try{
      await this.firestore.logout();
    } catch (e) {

    }
  }
}
