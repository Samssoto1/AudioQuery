import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

// Services
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') signinForm: NgForm;
  public showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    if(this.signinForm.valid){
      this.authService.loginUser( 
      {
        email: this.signinForm.value.email,
        password: this.signinForm.value.password
      })
      // const headers = new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

  public toggleShow(): void {
    this.showPassword = !this.showPassword;
  }
  

}
