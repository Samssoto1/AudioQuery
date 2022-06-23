import { NgModule } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PinComponent } from "./components/pin/pin.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { CreateAQuizComponent } from "./components/create-a-quiz/create-a-quiz.component";
import { CreateQuizQuestionsComponent } from "./components/create-quiz-questions/create-quiz-questions.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-a-quiz', component: CreateAQuizComponent, canActivate: [AuthGuard]},
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'create-a-quiz-question', component: CreateQuizQuestionsComponent},
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