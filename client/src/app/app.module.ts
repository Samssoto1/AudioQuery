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
import { PinComponent } from './components/pin/pin.component';
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
import { DeleteQuizComponent } from './components/dialog/delete-quiz/delete-quiz.component';
import { QuizDashboardComponent } from './components/quiz-dashboard/quiz-dashboard.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { MatTableModule } from '@angular/material/table'  
import { MatPaginatorModule } from '@angular/material/paginator';
import { ShowSongsButtonComponent } from './components/show-songs-button/show-songs-button.component';
import { SongFilterPipe } from './pipes/song-filter.pipe';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';


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
    DeleteQuizComponent,
    QuizDashboardComponent,
    NotFoundPageComponent,
    AddSongComponent,
    ShowSongsButtonComponent,
    SongFilterPipe,
    QuizListComponent
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
    MatPaginatorModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
