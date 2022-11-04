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
    this.appService.updateBackgroundColor("#292b2c");
    }

  ngOnDestroy(){
    this.appService.updateBackgroundColor("");
  }

  directToPin(){
    this.router.navigate(["/pin"])
  }

}
