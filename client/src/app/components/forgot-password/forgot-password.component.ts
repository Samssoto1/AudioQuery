import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('f') forgotPasswordForm: NgForm;
  errorMsg

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(){
    if(this.forgotPasswordForm.valid){
      this.httpService.post('forgotPassword', {email: this.forgotPasswordForm.value.email}).subscribe( (res) => {
        console.log(res['token'])
        localStorage.setItem('resetPasswordToken', res['token']);
        // navigate to success message
        // this.router.navigate('')

      });
  }
}

}
