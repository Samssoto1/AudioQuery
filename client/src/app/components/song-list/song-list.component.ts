import { Component, Input, OnInit} from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { take } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  canSelect: boolean;
  songData;
  term: string;
  selectedSong;
  // @Input() selectedSong;
  activeSong;
  songList = new FormControl('', Validators.required);
  formSelect;
  
  constructor(private httpService: HttpService) {
  }

  search(value: string){
    this.term = value;
  }

  getSelectedSong(song){
    console.log(song);
    this.selectedSong = song
  }

  ngOnInit(): void {
    
  }
}
