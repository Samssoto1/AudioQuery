import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, map, fromEvent, startWith} from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  @Output() setBgColor = new EventEmitter();

  showHost: boolean = false;

  
  // window = window;
  window: Window = window
  windowWidth;
  isScreenSmall$;

  constructor(private appService: AppService, private router: Router) { 
  }

  ngOnInit(): void {
  // this.window = window;
  console.log(this.window);

  const checkScreenSize = () => {
    this.windowWidth = window.screen.availWidth;
    // document.body.offsetWidth < 1024;
  }
  
  // Create observable from window resize event with debounce so only fires every 500ms after change
  const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(10), map(checkScreenSize));
  this.isScreenSmall$ = screenSizeChanged$.pipe(startWith(checkScreenSize()))
/*



      // Start off with the initial value use the isScreenSmall$ | async in the
  // view to get both the original value and the new value after resize.

*/
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

  toggleHowTo(){
    if(this.showHost){
      this.showHost = false;
    }
    else{
      this.showHost = true;
    }
  }

}
