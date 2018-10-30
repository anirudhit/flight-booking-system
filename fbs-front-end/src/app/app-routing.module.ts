import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/components/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FlightScheduleComponent } from './flight-schedule/flight-schedule.component';
import { FlightHistoryComponent } from './flight-history/flight-history.component';
import { ProfileComponent } from './profile/profile.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';

// import { CustomerComponent } from './customer/customer.component';
// import { AddCustomerComponent } from './add-customer/add-customer.component';
// import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'flightschedule', component: FlightScheduleComponent, canActivate: [AuthGuard] },
  { path: 'flightshistory', component: FlightHistoryComponent, canActivate: [AuthGuard] },
  { path: 'flightsbooking', component: FlightBookingComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent }
  // { path: '**', redirectTo: ''},
  // { 
  //   path: 'customers', 
  //   component: CustomerComponent 
  // },
  // { 
  //   path: 'customer/add', 
  //   component: AddCustomerComponent 
  // },
  // { 
  //   path: 'customers/:id', 
  //   component: CustomerDetailsComponent 
  // }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}