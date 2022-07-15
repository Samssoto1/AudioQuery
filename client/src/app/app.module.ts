import { environment } from 'src/environments/environment'

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing-module';

import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './footer.component';
import { HomeComponent } from './components/home/home.component';
import { PinComponent } from './components/game/game/pin/pin.component';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { QuizComponent } from './components/quiz/quiz.component';
import { CreateAQuizComponent } from './components/create-a-quiz/create-a-quiz.component';
import { CreateQuizQuestionsComponent } from './components/create-quiz-questions/create-quiz-questions.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongItemComponent } from './components/song-item/song-item.component';
import { DeleteComponent } from './components/dialog/delete/delete.component';
import { QuizDashboardComponent } from './components/quiz-dashboard/quiz-dashboard.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { MatTableModule } from '@angular/material/table'  
import { MatPaginatorModule } from '@angular/material/paginator';
import { ShowSongsButtonComponent } from './components/show-songs-button/show-songs-button.component';
import { SongFilterPipe } from './pipes/song-filter.pipe';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PlayQuizComponent } from './components/play-quiz-component/play-quiz-component.component';
import { GameComponent } from './components/game/game/game.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PromptForNicknameComponent } from './components/game/prompt-for-nickname/prompt-for-nickname.component';
import { ReloadQuizDirective } from './directives/reload-quiz.directive';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionComponent } from './components/question/question.component';
import { GameAnswerComponent } from './components/game/game-answer/game-answer.component';

const config: SocketIoConfig = {
  url: environment.socketUrl, //socket server url;
  options: {
    autoConnect: false,
    transports: ['websocket']
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FooterComponent,
    HomeComponent,
    PinComponent,
    AdminDashboardComponent,
    QuizComponent,
    CreateAQuizComponent,
    CreateQuizQuestionsComponent,
    SongListComponent,
    SongItemComponent,
    DeleteComponent,
    QuizDashboardComponent,
    NotFoundPageComponent,
    AddSongComponent,
    ShowSongsButtonComponent,
    SongFilterPipe,
    QuizListComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PlayQuizComponent,
    GameComponent,
    PromptForNicknameComponent,
    ReloadQuizDirective,
    QuestionListComponent,
    QuestionComponent,
    GameAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
