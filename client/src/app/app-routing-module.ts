import { NgModule } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";

// Guards
import { AuthGuard } from "./auth.guard";

// Components
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PinComponent } from "./components/game/game/pin/pin.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { CreateQuizComponent } from "./components/createQuiz/createQuiz.component";
import { QuestionCreator } from "./components/question-creator/question-creator.component";
import { QuizDashboardComponent } from "./components/quiz-dashboard/quiz-dashboard.component";
import { NotFoundPageComponent } from "./components/not-found-page/not-found-page.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { GameComponent } from "./components/game/game/game.component";
import { PromptForNicknameComponent } from "./components/game/prompt-for-nickname/prompt-for-nickname.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'resetPassword/:userId/:tokenId', component: ResetPasswordComponent},
  {path: 'quiz', children: [
    {path: 'createQuiz', component: CreateQuizComponent, pathMatch: 'full', canActivate: [AuthGuard]},
    {path: 'create-a-quiz-question/:quizId', component: QuestionCreator, canActivate: [AuthGuard]},
    {path: 'edit-a-quiz-question/:questionId', component: QuestionCreator, canActivate: [AuthGuard]},
    {path: 'dashboard/:quizId', component: QuizDashboardComponent, pathMatch: 'full', canActivate: [AuthGuard]}
  ], canActivate: [AuthGuard]},
  {path: 'nickname', component: PromptForNicknameComponent},
  {path: 'game', component: GameComponent},
  {path: 'game/:quizId', component: GameComponent},
  {path: 'pin', component: PinComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
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