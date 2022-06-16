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
          return this.http.get(`${this.api}/api/users/singleuser/${object}`);
        }
    }
  }

  // Handle Post Routes
  post(verb: string, object: any) {
    // used for all post routes
    switch (verb) {
      case 'registration': {
        return this.http.post(`${this.api}/api/users/createuser`, object);
      }
      case 'login': {
        return this.http.post(`${this.api}/api/users/login`, object)
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

  // private saveAuthData(token: string, expirationDate: Date) {
  //   console.log(expirationDate);
  //   console.log(expirationDate.toISOString);
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('expiration', expirationDate.toISOString());
  // }

  // private clearAuthData() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('expiration');
  // }

  // private getAuthData() {
  //   const token = localStorage.getItem('token');
  //   const expirationDate = localStorage.getItem('expiration');
  //   if (!token || !expirationDate) {
  //     return '';
  //   }
  //   return {
  //     token: token,
  //     expirationDate: new Date(expirationDate),
  //   };
  // }

  // autoAuthUser() {
  //   const authInformation = this.getAuthData();
  //   if (!authInformation) {
  //     return;
  //   }
  //   const now = new Date();
  //   const expiresIn =
  //     authInformation['expirationDate'].getTime() - now.getTime();
  //   if (expiresIn > 0) {
  //     this.token = authInformation['token'];
  //     this.isAuth = true;
  //     this.setAuthTimer(expiresIn / 1000); // works in seconds so we divide the miliseconds by 1000 to get seconds
  //     this.authStatusListener.next(true);
  //   }
  // }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // getIsAuth() {
  //   return this.isAuth;
  // }

  getData() {
    return this.http.get('http://localhost:8000/test');
  }



  // private setAuthTimer(duration: number) {
  //   this.tokenTimer = setTimeout(() => {
  //     this.logout();
  //   }, duration * 1000); // setTimeout works with miliseconds. Multiplying seconds by *1000 for mili..
  // }

  // logout() {
  //   this.token = null;
  //   this.isAuth = false;
  //   this.authStatusListener.next(false);
  //   this.router.navigate(['/']);
  //   clearTimeout(this.tokenTimer);
  //   this.clearAuthData();
  // }
}
