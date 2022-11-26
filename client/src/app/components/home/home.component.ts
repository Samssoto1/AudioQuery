import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  @Output() setBgColor = new EventEmitter();

  constructor(private appService: AppService, private router: Router) { 
  }

  ngOnInit(): void {

    // let spline = new Application(this.test);
    // spline.load('https://prod.spline.design/MJULiB7Y2cdgKvzL/scene.splinecode');


    this.appService.updateBackgroundColor("dark", false);
    }

  ngOnDestroy(){
    this.appService.updateBackgroundColor("", false);
  }

  directToPin(){
    this.router.navigate(["/pin"])
  }

  directToRegister(){
    this.router.navigate(["/register"]);
  }

}
