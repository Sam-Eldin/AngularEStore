import {Component, OnInit} from '@angular/core';
import {FirebaseHelper} from "../Utilites/firebase-helper.service";
import {product} from "./item/item.component";
import {Router} from "@angular/router";
import {ToasterHelperService, toasterTypes} from "../Utilites/toaster-helper.service";

const testProduct: product = {name: 'vodka', description: 'good stuff'.repeat(10), price: 15, quantity: 10};

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public products: Array<product> = [];
  public username: string | null = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';



  constructor(private router: Router, public firestore: FirebaseHelper, private toaster: ToasterHelperService) {
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

  ngOnInit() {

  }



  async displayModal() {
    try {
      this.toaster.createToaster(toasterTypes.info, 'Changing password');
      await new Promise(f => setTimeout(f, 1000));
      await this.firestore.changePassword(this.oldPassword, this.newPassword);
      this.toaster.createToaster(toasterTypes.success, 'Password changed successfully');
    } catch (e) {
      this.toaster.createToaster(toasterTypes.error, 'Failed: ' + e);
    }
  }
}
