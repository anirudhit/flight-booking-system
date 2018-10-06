import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
     path: 'flights', 
     component: FlightSearchComponent 
   },
   { 
     path: 'customers', 
     component: CustomerComponent 
   },
   { 
     path: 'customer/add', 
     component: AddCustomerComponent 
   },
   { 
     path: 'customers/:id', 
     component: CustomerDetailsComponent 
   },
   { 
     path: '', 
     redirectTo: 'login', 
     pathMatch: 'full'
   }, 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}