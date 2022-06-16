import { NgModule } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PinComponent } from "./components/pin/pin.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, children: 
  [
  {path: ':id', component: ProfileComponent}
  ]}, // Fix this to get to profile by ID later
  {path: 'pin', component: PinComponent},
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]}
  // {path: 'dashboard', component: },
  // {path: 'profile', component: }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule{

}