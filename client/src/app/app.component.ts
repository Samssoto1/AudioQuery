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

    this.authService.autoAuthUser();

  }


}


