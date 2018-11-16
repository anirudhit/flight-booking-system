import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule }    from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes-fb';
import { AppMaterialModule } from './app-material/app-material.module';
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

import { AppComponent } from './app.component-fb';

import { HeaderFbComponent } from './header-fb/header-fb.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FlightScheduleComponent } from './flight-schedule/flight-schedule.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlightHistoryComponent } from './flight-history/flight-history.component';
import { MatDialogModule }  from '@angular/material/dialog';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { FlightTicketComponent } from './flight-ticket/flight-ticket.component';


import { DeleteScheduleDialog } from './flight-history/flight-history.component';
import { UpdateScheduleDialog } from './flight-history/flight-history.component';
import { CancelBookingDialog } from './my-trips/my-trips.component';
import { ManageBookingDialog } from './my-trips/my-trips.component';

@NgModule({
  entryComponents:[
    DeleteScheduleDialog,
    UpdateScheduleDialog,
    CancelBookingDialog,
    ManageBookingDialog
  ],
  declarations: [
    AppComponent,
    LoginFbComponent,
    UserComponent,
    RegisterComponent,
    HeaderFbComponent,
    HomeComponent,
    ProfileComponent,
    FlightScheduleComponent,
    FlightHistoryComponent,
    FlightBookingComponent,
    MyTripsComponent,
    FlightTicketComponent,
    DeleteScheduleDialog,
    UpdateScheduleDialog,
    CancelBookingDialog,
    ManageBookingDialog
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AppMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
