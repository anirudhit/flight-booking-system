import { Routes } from '@angular/router';

import { LoginFbComponent } from './login-fb/login.component';
import { UserComponent } from './user-fb/user.component';
import { RegisterComponent } from './register-fb/register.component';
import { UserResolver } from './user-fb/user.resolver';

import { HomeComponent } from './home/home.component';


import { AuthGuard } from './auth-fb/auth.guard';
import { FlightScheduleComponent } from './flight-schedule/flight-schedule.component';
import { FlightHistoryComponent } from './flight-history/flight-history.component';
import { ProfileComponent } from './profile/profile.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFbComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent, resolve: { data: UserResolver}},
  { path: 'home', component: HomeComponent, resolve: { data: UserResolver}},
  { path: 'flightschedule', component: FlightScheduleComponent, resolve: { data: UserResolver}},
  { path: 'flightshistory', component: FlightHistoryComponent, resolve: { data: UserResolver}},
  { path: 'flightsbooking', component: FlightBookingComponent, resolve: { data: UserResolver}}
];