import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate.service';
import { Router } from '@angular/router';
import { RegisterInfo } from './register.modal';

// Services
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  public showPassword: boolean = false;

  constructor(private validateService: ValidateService, private authService: AuthService, private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  
  onRegisterSubmit(){
    if(this.signupForm.valid && this.signupForm.value.password == this.signupForm.value.passwordConfirmation){
      
      this.authService.createUser({username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      });
      
      // this.httpService.post("registration", 
      // {
        //   username: this.signupForm.value.username,
        //   email: this.signupForm.value.email,
        //   password: this.signupForm.value.password
        // })
        this.router.navigate(['/login']);
    }
  }
  public toggleShow(): void {
    console.log('in here')
    this.showPassword = !this.showPassword;
  }

}
