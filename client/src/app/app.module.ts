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
import { MatIconModule } from '@angular/material/icon';
import { QuizComponent } from './components/quiz/quiz.component';
import { CreateAQuizComponent } from './components/create-a-quiz/create-a-quiz.component';
import { CreateQuizQuestionsComponent } from './components/create-quiz-questions/create-quiz-questions.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongItemComponent } from './components/song-item/song-item.component';


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
    SongItemComponent
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
    MatIconModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
