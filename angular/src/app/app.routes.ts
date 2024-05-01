import { Routes } from '@angular/router';


import {SignupComponent} from './signup/signup.component'
import {LoginComponent} from './login/login.component'
import { UserdataComponent } from './userdata/userdata.component';

export const routes: Routes = [
    {path:'userdata',component:UserdataComponent},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
];
