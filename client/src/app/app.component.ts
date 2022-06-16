import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private authService: AuthService, private httpService: HttpService){

  }

  ngOnInit(): void {
    this.getDataFromApi();// on app startup - run

    this.authService.autoAuthUser();

  }

  getDataFromApi(){
    this.httpService.getData().subscribe((res)=>{
      console.log('here')
      console.log('Response from API is ', res);
    }, (error) => {
      console.log('Error is ', error);
    })
  }

}


