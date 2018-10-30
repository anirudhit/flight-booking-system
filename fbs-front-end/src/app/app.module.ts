import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/components/login.component';
import { RegisterComponent } from './register/register.component';
import { FlightScheduleComponent } from './flight-schedule/flight-schedule.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './profile/profile.component';
import { FlightHistoryComponent } from './flight-history/flight-history.component';
import { MatDialogModule }  from '@angular/material/dialog';
import { DeleteScheduleDialog } from './flight-history/flight-history.component';
import { UpdateScheduleDialog } from './flight-history/flight-history.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';

// import { CustomerComponent } from './customer/customer.component';
// import { CustomerDetailsComponent } from './customer-details/customer-details.component';
// import { AddCustomerComponent } from './add-customer/add-customer.component';

@NgModule({
  entryComponents:[
    DeleteScheduleDialog,
    UpdateScheduleDialog
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FlightScheduleComponent,
    ProfileComponent,
    FlightHistoryComponent,
    DeleteScheduleDialog,
    UpdateScheduleDialog,
    FlightBookingComponent//,
    // CustomerComponent,
    // CustomerDetailsComponent,
    // AddCustomerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
