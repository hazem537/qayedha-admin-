import { Routes } from '@angular/router';
import { CodesComponent } from './codes/codes.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { SettingComponent } from './setting/setting.component';
import { NotificationComponent } from './notification/notification.component';
import { InfluncerCodeComponent } from './influncer-code/influncer-code.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [

    {path:'',component:HomeComponent,canActivate:[AuthGuard]},
    {path:"codes",component:CodesComponent,canActivate:[AuthGuard]},
    {path:"influncer-codes",component:InfluncerCodeComponent,canActivate:[AuthGuard]},
    {path:"auth",component:AuthComponent},
    {path:'setting',component:SettingComponent,canActivate:[AuthGuard]},
    {path:'notification',component:NotificationComponent,canActivate:[AuthGuard]},
];
