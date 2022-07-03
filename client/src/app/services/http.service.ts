import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

// SHOULD I SPLIT THIS SERVICE INTO MULTIPLE?
// AUTH, HTTP, ??
// IS THERE AN EASY WAY TO DO THIS / FIX ROUTE DEPENDENCIES?

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  api: string = 'http://localhost:8000';
  private tokenTimer: NodeJS.Timer;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuth = false;
  
  constructor(private http: HttpClient, private router: Router) {}
  
  // Handle Get Routes
  get(route: string, object: any) {
    switch (route) {
      case 'admin': {
        this.http.get(`${this.api}/admin`, object).subscribe((data) => {
          console.log('here');
        });
        break;
      }
        case 'profile':
          {
          return this.http.get(`${this.api}/api/users/singleuserByUsername/${object}`);
        }
      case 'quizzesForUser' : {
        return this.http.get(`${this.api}/api/quiz/quizzesForUser/${object}`);
      }
      case 'quizQuestions': {
        return this.http.get(`${this.api}/api/quiz/getQuizQuestions/${object}`);
      }
      case 'getQuestionById': {
        return this.http.get(`${this.api}/api/quiz/getQuestionById/${object}`);
      }
      case 'getQuizById': {
        return this.http.get(`${this.api}/api/quiz/getQuizById/${object}`);
      }
      case 'listOfSongs': {
        return this.http.get(`${this.api}/api/quiz/getListOfSongs`);
      }
      default:
        {
          break;
        }
    }
  }

  // Handle Post Routes
  post(route: string, object: any) {
    // used for all post routes
    switch (route) {
      case 'registration': {
        return this.http.post(`${this.api}/api/users/createuser`, object);
      }
      case 'login': {
        return this.http.post(`${this.api}/api/users/login`, object)
        }
      case 'create-a-quiz': {
        return this.http.post(`${this.api}/api/quiz/create-a-quiz`, object)
      }
      case 'create-a-question': {
        return this.http.post(`${this.api}/api/quiz/create-a-question`, object)
      }
      case 'adminSongUpload': {
        return this.http.post(`${this.api}/api/quiz/songUpload`, object)
      }
      case 'forgotPassword': {
        return this.http.post(`${this.api}/api/users/forgotPassword`, object);
      }
      default:
        {
          break;
        }
    }
  }

  // Handle Delete Routes
  delete(route, object){
    switch (route) {
      case "quiz": {
        return this.http.delete(`${this.api}/api/quiz/delete/${object}`);
      }
      case "quizQuestion":{
        return this.http.delete(`${this.api}/api/quiz/deleteQuestion/${object}`);
      }
      case "allQuizQuestions":{
        return this.http.delete(`${this.api}/api/quiz/deleteAllQuizQuestions/${object}`);
      }
      default:
        {
          break;
        }
    }
  }
  
  getToken() {
    return this.token;
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
}
