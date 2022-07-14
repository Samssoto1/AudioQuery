import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


// Services
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') signinForm: NgForm;
  public showPassword: boolean = false;
  errorMsg: string;
  errorSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.errorSub = this.authService.errorMsg.subscribe(errorMsg => {
      this.errorMsg = errorMsg;
      console.log(errorMsg);
    });  

    // give list to quiz (Child) component

  }

  onLoginSubmit(){
    if(this.signinForm.valid){
      this.authService.loginUser( 
      {
        email: (this.signinForm.value.email).toLowerCase(),
        password: this.signinForm.value.password
      })
      // const headers = new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  public toggleShow(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  forgotPassword(){
    this.router.navigate(['/forgotPassword']);
  }
  

}
