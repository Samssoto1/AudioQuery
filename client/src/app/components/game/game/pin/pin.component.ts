import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  @ViewChild('f') pinForm: NgForm;

  constructor(private gameService: GameService, private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  onPinSubmit(){
    if(this.pinForm.valid == true){
      // Check if Pin is valid..

      // if valid....
      this.httpService.get('getRoom', this.pinForm.value.pin).subscribe((res) => {
        console.log(res);
        // send pin via binding to child - nickname
        this.gameService.pinToNickname(res);
        this.router.navigate(['nickname']); // navigate to nickname

        // Do I unsubscribe here?
      }, error => {
        console.log(error)
        alert('bad pin')
        // this.errorMsg = error['error']['message'];

        // Do I unsubscribe here?
        
      })
    }
  }

}
