import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenTimer: NodeJS.Timer;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuth = false;
  private userId: string;
  

  constructor(private httpService: HttpService, private router: Router) { }

  createUser(object: any){ // Create a user - Register
    this.httpService.post("registration", object).subscribe();
  }

  loginUser(object: any){ // Login a user - Login
    this.httpService.post("login", object).subscribe((data) => {
      console.log(data);
      if (data['success'] == true) {
        this.token = data['token']
        this.userId = data['user']['id'];
        console.log(this.userId);
        const expiresInDuration = data['expiresIn'];
        this.setAuthTimer(expiresInDuration);
        this.isAuth = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        ); // miliseconds again
        this.saveAuthData(this.token, expirationDate, this.userId);
        this.router.navigate(['/profile']);
      } 
      else {}
    }); 
  }

  getId(){
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuth;
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000); // setTimeout works with miliseconds. Multiplying seconds by *1000 for mili..
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    console.log(expirationDate);
    console.log(expirationDate.toISOString);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn =
      authInformation['expirationDate'].getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation['token'];
      this.isAuth = true;
      this.setAuthTimer(expiresIn / 1000); // works in seconds so we divide the miliseconds by 1000 to get seconds
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return '';
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

}
