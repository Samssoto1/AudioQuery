import { Component, OnInit, Inject, Optional} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
//@Optional() is used to prevent error if no data is passed
  constructor( @Optional() @Inject(MAT_DIALOG_DATA) public list_of_songs, private matDialogRef: MatDialogRef<SongListComponent>) {
  }

  search(value: string){
    this.term = value;

  }

  getSelectedSong(song){
    console.log(song);
    this.selectedSong = song
  }

  ngOnInit(): void {
    
    this.songData = this.list_of_songs.list_of_songs;
    console.log(this.list_of_songs);
  }

  ngOnDestroy(){
    this.matDialogRef.close(this.selectedSong);
  }

}
