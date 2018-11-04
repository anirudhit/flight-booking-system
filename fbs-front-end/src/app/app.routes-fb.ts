import { Routes } from '@angular/router';

import { LoginFbComponent } from './login-fb/login.component';
import { UserComponent } from './user-fb/user.component';
import { RegisterComponent } from './register-fb/register.component';
import { UserResolver } from './user-fb/user.resolver';


import { AuthGuard } from './auth-fb/auth.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFbComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
];
