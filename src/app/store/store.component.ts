import {Component, OnInit} from '@angular/core';
import {ActiveToast, ToastrService} from "ngx-toastr";
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
  public username: string | null = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  phoneNumber: string = '';


  private currentToaster: ActiveToast<any> | undefined;

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

  ngOnInit() {
    this.firestore.firebaseAuth?.onAuthStateChanged((user) => {
      if (user && user.email) {
        this.username = user.email.split('@')[0];
      } else {
        this.currentToaster = this.toaster.warning('You must sign in');
        this.router.navigateByUrl('').then(() => {
        });
      }
    });
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

  async displayModal() {
    try {
      this.currentToaster = this.toaster.info('Changing password');
      await new Promise(f => setTimeout(f, 1000));
      await this.firestore.changePassword(this.oldPassword, this.newPassword);
      this.toaster.remove(this.currentToaster.toastId);
      this.toaster.success('Password changed successfully');
    } catch (e) {
      console.log(e);
      if (this.currentToaster) {
        this.toaster.remove(this.currentToaster.toastId);
      }
      this.toaster.error('Failed: ' + e);
    }
  }
}