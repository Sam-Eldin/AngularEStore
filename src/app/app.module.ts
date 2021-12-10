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
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  {path: '', component: StoreComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    AuthenticationComponent,
    StoreComponent
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
    AngularFireModule.initializeApp(environment.firebase),
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
