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
import { QuizDashboardComponent } from "./components/quiz-dashboard/quiz-dashboard.component";
import { NotFoundPageComponent } from "./components/not-found-page/not-found-page.component";

import { AddSongComponent } from "./components/add-song/add-song.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'quiz', children: [
    {path: 'create-a-quiz', component: CreateAQuizComponent, pathMatch: 'full'},
    {path: 'create-a-quiz-question/:quizId', component: CreateQuizQuestionsComponent},
    {path: 'dashboard/:quizId', component: QuizDashboardComponent, pathMatch: 'full'}
  ], canActivate: [AuthGuard]},
  {path: 'pin', component: PinComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  // {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
   //Wild Card Route for 404 request
   { path: '**', pathMatch: 'full', 
   component: NotFoundPageComponent },

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule{

}