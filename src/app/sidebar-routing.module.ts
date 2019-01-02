import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AddreviewComponent } from './addreview/addreview.component';
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { ViewreviewComponent } from './viewreview/viewreview.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
      path : '' , 
      component: SidenavComponent,
    
      children:[
        {
            path:'home',
            component:HomeComponent,
              
        },
        {
            path:'profile',
            component:ProfileComponent,
              
        },
        {
            path:'review',
            component:AddreviewComponent,
            canActivate: [AuthGuard],     
        },
        {
            path:'admin',
            component:AddadminComponent,
            canActivate: [AuthGuard],     
        },
        {
            path:'login',
            component:LoginComponent

            
        },
        {
            path:'myreviews',
            component:MyreviewsComponent,
            canActivate: [AuthGuard],     
        },  
        {
            path:'allreviews/:id',
            component:ViewreviewComponent    
        },  
        {
            path:'myreview/:id',
            component:ViewreviewComponent ,
            canActivate: [AuthGuard]   
        },
        {
            path:'logout',
            component:LogoutComponent   
        },
        {
            path:'**',
            redirectTo:'login'
        }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideBarRoutingModule { }
