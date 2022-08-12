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
  error$: Observable<string>; // Uses async pipe to process response from server if necessary and saves error msg in variable (serverErrorMsg)

  errorSub: Subscription;

  hideError: boolean = false;

  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.error$ = this.authService.errorMsg 
    // Async Pipe setup for response from server if error occurs
  }

  onLoginSubmit(){
    console.log(this.signinForm);
    if(this.signinForm.valid){ // If form is valid, send login information to server
      this.authService.loginUser( 
      {
        email: (this.signinForm.value.email).toLowerCase(), // lowercase used for unique emails that don't differentiate by capitals.
        password: this.signinForm.value.password
      })
      this.signinForm.form.markAsPristine()
      this.signinForm.form.updateValueAndValidity()
      this.hideError = true;
      this.errorSub = this.authService.errorMsg.subscribe((res) => {
        if(res != undefined){
          this.hideError = false;
          this.error = res;
        }
        else{
          this.hideError = true;
        }

        this.errorSub.unsubscribe();
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
