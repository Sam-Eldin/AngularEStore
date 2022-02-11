import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {environment} from "../../environments/environment";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import {product} from "../store/item/item.component";


interface userData {
  cart: any,
  name: string
}

interface cartItem {
  name: string,
  description: string,
  price: number,
  image_name: string,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseHelper {

  public user: firebase.User | undefined | null;
  public firebaseAuth: firebase.auth.Auth | undefined;
  public firestore: firebase.firestore.Firestore | undefined;
  public firebaseApp: firebase.app.App | undefined;


  private readonly productsCollection: firebase.firestore.CollectionReference<any>;
  private readonly usersCollection: firebase.firestore.CollectionReference<any>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.firebaseApp = firebase.initializeApp(environment.firebase);
    this.firebaseAuth = this.firebaseApp.auth();
    this.firestore = this.firebaseApp.firestore();
    this.productsCollection = this.firestore.collection('products');
    this.usersCollection = this.firestore.collection('users');
    this.firebaseAuth?.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }


  /// Authentication

  async login(email: string, password: string) {
    try {
      await this.firebaseAuth?.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(async () => {
        await this.firebaseAuth?.signInWithEmailAndPassword(email, password);
        this.user = this.firebaseAuth?.currentUser;
      });
    } catch (e) {
      throw new Error('Failed to sign in: ' + e);
    }
  }

  async emailResetPassword(email: string) {
    await this.afAuth.sendPasswordResetEmail(email);
  }

  async emailSignup(email: string, password: string) {
    const userCredential = await this.firebaseAuth?.createUserWithEmailAndPassword(email, password);
    if (userCredential && userCredential.user && userCredential.user.email) {
      await this.firestore?.collection('users').doc(userCredential.user.uid).set({
        'name': userCredential.user.email.split('@')[0],
        'cart': {}
      })
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.router.navigateByUrl('');
    } catch (e) {
    }
  }

  async changePassword(oldPass: string, newPass: string) {
    if (this.firebaseAuth && this.firebaseAuth.currentUser && this.user && this.user.email) {
      const provider = firebase.auth.EmailAuthProvider.credential(this.user.email, oldPass);
      await this.firebaseAuth.currentUser.reauthenticateWithCredential(provider);
      await this.user.updatePassword(newPass);
    }
  }

  // END AUTHENTICATION


  // Products collection functions
  async getAllProducts(): Promise<product[]> {
    if (!this.firestore) {
      throw new Error('firestore is not initialized');
    }
    const products = (await this.productsCollection.get()).docs;
    let result: product[] | PromiseLike<product[]> = [];
    for (let i = 0; i < products.length; i++) {
      const data = await this.getProductByName(products[i].id);
      result.push(data);
    }
    return result;
  }


  async getProductByName(item_name: string): Promise<product> {
    const doc = await this.productsCollection.doc(item_name).get();
    if (!doc.exists)
      throw new Error('Item not found');
    let data: product = doc.data();
    data.image_name = data.name.replace(/[ ]/g, '_') + '.png';
    return data;
  }

  // Users collection functions
  async getUserCart(): Promise<cartItem[]> {
    if (!this.user) {
      throw new Error('No user!!!');
    }
    const data = <userData>(await this.usersCollection.doc(this.user.uid).get()).data();
    let result: cartItem[] = [];
    let temp: cartItem = {name: '', image_name: '', price: 0, description: '', quantity: 0};
    for (const [name, quantity] of Object.entries(data.cart)) {
      const prod = await this.getProductByName(name);
      temp.name = name;
      temp.quantity = Number(quantity);
      temp.price = prod.price;
      temp.description = prod.description;
      temp.image_name = prod.image_name;
      result.push(temp);
    }
    return result;
  }

  async addItem(item_name: string) {
    if (!this.user) {
      throw new Error('No user!!!');
    }
    let prevData = <userData>(await this.usersCollection.doc(this.user.uid).get()).data();
    const itemQ = prevData.cart.hasOwnProperty(item_name) ? prevData.cart[item_name] : 0;
    prevData.cart[item_name] = itemQ + 1;
    await this.usersCollection.doc(this.user.uid).update(prevData);
  }

  async removeItem(item_name: string) {
    if (!this.user) {
      throw new Error('No user!!!');
    }
    let prevData = <userData>(await this.usersCollection.doc(this.user.uid).get()).data();
    delete prevData.cart[item_name];
    await this.usersCollection.doc(this.user.uid).update(prevData);
  }

  async updateItem(item_name: string, newQuantity: number) {
    if (!this.user) {
      throw new Error('No user!!!');
    }
    let prevData = <userData>(await this.usersCollection.doc(this.user.uid).get()).data();
    prevData.cart.set(item_name, newQuantity);
    await this.usersCollection.doc(this.user.uid).update(prevData);
  }
}
