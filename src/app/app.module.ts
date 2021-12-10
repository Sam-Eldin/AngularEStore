import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './main/app.component';
import { LoginComponent } from './authentication/login/login.component';
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';
import {RouterModule, Routes} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { SignupComponent } from './authentication/signup/signup.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {FirebaseHelper} from "./FirebaseHelper/firebase-helper.service";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {FormsModule} from "@angular/forms";
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import {ToastService, AngularToastifyModule} from "angular-toastify";
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'}
]

const firebaseConfig = {
  apiKey: "AIzaSyCa1K3WPYgroy4cQXTj4MDLbyGK9-W6xU8",
  authDomain: "angularonlinestore-6f08f.firebaseapp.com",
  projectId: "angularonlinestore-6f08f",
  storageBucket: "angularonlinestore-6f08f.appspot.com",
  messagingSenderId: "533994519575",
  appId: "1:533994519575:web:981b5a835738cb050d3052",
  measurementId: "G-YGKCT0NGLJ"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true,
        timeOut: 2000,
        autoDismiss: true,
        positionClass: 'toast-top-center',
      }
    ),
    MatInputModule,
    AngularToastifyModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ToastContainerModule
  ],
  providers: [
    FirebaseHelper,
    AngularFireDatabase,
    AngularFireAuth,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
