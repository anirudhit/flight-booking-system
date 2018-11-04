import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes-fb';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginFbComponent } from './login-fb/login.component';
import { UserComponent } from './user-fb/user.component';
import { RegisterComponent } from './register-fb/register.component';
import { UserResolver } from './user-fb/user.resolver';
import { AuthGuard } from './auth-fb/auth.guard';
import { AuthService } from './auth-fb/auth.service';
import { UserService } from './auth-fb/user.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component-fb';

@NgModule({
  declarations: [
    AppComponent,
    LoginFbComponent,
    UserComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
