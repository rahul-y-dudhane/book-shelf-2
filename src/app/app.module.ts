import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { SideBarRoutingModule } from './sidebar-routing.module';
import { AddreviewComponent } from './addreview/addreview.component';
import { AdminSevice } from './services/admin.service';
import { ReviewService } from './services/review.service';
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { ViewreviewComponent } from './viewreview/viewreview.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    AddreviewComponent,
    MyreviewsComponent,
    ViewreviewComponent,
    AddadminComponent,
    LogoutComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    NgbModule,
    SideBarRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AdminSevice, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
