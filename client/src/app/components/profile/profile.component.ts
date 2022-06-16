import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  registrationDate;
  list_of_quizzes: Array<any>; // any for now (implement quiz model later)
  imgUrl: string = "https://www.listchallenges.com/f/lists/57789dce-7a91-4176-9733-cdfdc7d6d350.jpg"

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    // this.httpService.get("profile", );
    const userId = localStorage.getItem('userId');
    this.httpService.get('profile', userId).subscribe((data) => {
      this.username = data['username'];
      this.registrationDate = data['registrationDate'];
      this.list_of_quizzes = data['quizzes'];
      console.log(this.list_of_quizzes);
    });

  }

}
