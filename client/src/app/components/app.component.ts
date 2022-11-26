import { Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

// Global Service
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SocketService]
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'AudioQuery';
  bgColor: any = "";
  subscription: Subscription;

  // Toggle on and off on different views
  backgroundAnimation: boolean;



  constructor(private authService: AuthService, private appService: AppService, private cdr: ChangeDetectorRef){
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.subscription = this.appService.backgroundColor.subscribe((data) =>{ // data.color, data.backgroundAnimation
      console.log(data);
      this.backgroundAnimation = data['backgroundAnimation'];
      // if(data['color'] != ""){
        this.bgColor = data['color'];
        console.log(this.bgColor)
      // }
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


