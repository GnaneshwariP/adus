import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomeComponent } from './components/home/home.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ChangepwdComponent } from './components/changepwd/changepwd.component';
import { Changepwd2Component } from './components/changepwd2/changepwd2.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { Forgotpassword2Component } from './components/forgotpassword2/forgotpassword2.component';
import { Forgotpassword1Component } from './components/forgotpassword1/forgotpassword1.component';
import { OtpComponent } from './components/otp/otp.component';
import { ReportComponent } from './components/report/report.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ViewEditCustomerComponent } from './components/view-edit-customer/view-edit-customer.component';
import { TotalRevenueGeneratedComponent } from './components/total-revenue-generated/total-revenue-generated.component';
import { TotalcustomersActivecustomersComponent } from './components/totalcustomers-activecustomers/totalcustomers-activecustomers.component';
import { CustomerRechargehistoryComponent } from './components/customer-rechargehistory/customer-rechargehistory.component';
import { AccesscodeHistoryComponent } from './components/accesscode-history/accesscode-history.component';
import { GenerateAccesscodeComponent } from './components/generate-accesscode/generate-accesscode.component';
import { PayComponent } from './components/pay/pay.component';



import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditCustomersComponent } from './components/edit-customers/edit-customers.component';





const appRoutes: Routes =  [
  {path:'home', component: HomeComponent,canActivate:[AuthGuard]},
  {path:'navbar', component: NavbarComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path:'add_customer', component: AddCustomerComponent,canActivate:[AuthGuard]},
  {path:'aboutus', component: AboutusComponent,canActivate:[AuthGuard]},
  {path:'contactus', component: ContactusComponent,canActivate:[AuthGuard]},
  {path:'changepwd', component: ChangepwdComponent,canActivate:[AuthGuard]},
  {path:'changepwd2', component: Changepwd2Component,canActivate:[AuthGuard]},
  {path:'forgotpassword', component: ForgotpasswordComponent},
  {path:'forgotpassword1', component: Forgotpassword1Component},
  {path:'forgotpassword2', component: Forgotpassword2Component},
  {path:'otp', component: OtpComponent,canActivate:[AuthGuard]},
  {path:'generate_accesscode', component: GenerateAccesscodeComponent,canActivate:[AuthGuard]},
  {path:'accesscode_history', component: AccesscodeHistoryComponent,canActivate:[AuthGuard]},
  {path:'report', component: ReportComponent,canActivate:[AuthGuard]},
  {path:'view_edit_customer', component: ViewEditCustomerComponent,canActivate:[AuthGuard]},
  {path:'total_revenue_generated', component: TotalRevenueGeneratedComponent,canActivate:[AuthGuard]},
  {path:'totalcustomers_activecustomers', component: TotalcustomersActivecustomersComponent,canActivate:[AuthGuard]},
  {path:'customer_rechargehistory', component: CustomerRechargehistoryComponent,canActivate:[AuthGuard]},
  {path:'pay', component: PayComponent,canActivate:[AuthGuard]},
  {path:'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path:'edit-customers', component: EditCustomersComponent,canActivate:[AuthGuard]}
 

]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AboutusComponent,
    HomeComponent,
    ContactusComponent,
    ChangepwdComponent,
    Changepwd2Component,
    ForgotComponent,
    ForgotpasswordComponent,
    Forgotpassword2Component,
    Forgotpassword1Component,
    OtpComponent,
    ReportComponent,
    AddCustomerComponent,
    ViewEditCustomerComponent,
    TotalRevenueGeneratedComponent,
    TotalcustomersActivecustomersComponent,
    CustomerRechargehistoryComponent,
    AccesscodeHistoryComponent,
    GenerateAccesscodeComponent,
    PayComponent,
    DashboardComponent,
    EditCustomersComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    BsDatepickerModule.forRoot()
   
    

  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
