import { Component, OnInit} from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string;
  username: string;
  registrationDate;
  isLoading: boolean = false;
  list_of_quizzes: Array<any>; // any for now (implement quiz model later)
  imgUrl: string = "https://www.listchallenges.com/f/lists/57789dce-7a91-4176-9733-cdfdc7d6d350.jpg"
  isGuest: boolean;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.username = params['params']['username'];

      this.httpService.get('profile', this.username).subscribe((data) => {
          this.isLoading = false;
          console.log(data)
          // this.username = data['username'];
          this.username = data[0]['username'];
          this.registrationDate = data[0]['registrationDate'];

          // if username in token matches username in url then show quizzes... is this secure??? (Doesn't feel like it) 
          try{
            const username = localStorage.getItem('username');
          
            if(this.username == username){
              this.isGuest = false;
              this.list_of_quizzes = data[0]['quizzes'];
            }
            console.log(this.list_of_quizzes);
          }
          catch{
            this.isGuest = true;
          }

        });

    });
    // this.isLoading = true;
    // const userId = localStorage.getItem('userId');
    // this.httpService.get('profile', userId).subscribe((data) => {
    //   this.isLoading = false;
    //   this.username = data['username'];
    //   this.registrationDate = data['registrationDate'];
    //   this.list_of_quizzes = data['quizzes'];
    //   console.log(this.list_of_quizzes);
    // });
    
  }

}
