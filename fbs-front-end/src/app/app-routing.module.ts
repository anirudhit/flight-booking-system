import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// import { CustomerComponent } from './customer/customer.component';
// import { AddCustomerComponent } from './add-customer/add-customer.component';
// import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
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