import { Component, OnInit} from '@angular/core';

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

  
  constructor() {
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
