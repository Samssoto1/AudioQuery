import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

// Services
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public showPassword: boolean = false; // Handles password toggle (Show / not show)

  @ViewChild('f') signinForm: NgForm;
  errorMsg: string;
  errorSub: Subscription;
  error$: Observable<string>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.error$ = this.authService.errorMsg // Async Pipe setup for response from server if error occurs
  }

  onLoginSubmit(){
    if(this.signinForm.valid){ // If form is valid, send login information to server
      this.authService.loginUser( 
      {
        email: (this.signinForm.value.email).toLowerCase(), // lowercase used for unique emails that don't differentiate by capitals.
        password: this.signinForm.value.password
      })
    }
  }

  public toggleShow(): void { // Handles toggling to show password
    this.showPassword = !this.showPassword;
  }

  forgotPassword(){ // Redirects user to the forgotPasssword page
    this.router.navigate(['/forgotPassword']);
  }

  signUp(){ // Redirects user to the signUp page
    this.router.navigate(['/register']);
  }
  

}
