import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {MatDialog} from '@angular/material/dialog';
import { SongListComponent } from '../song-list/song-list.component';

@Component({
  selector: 'app-show-songs-button',
  templateUrl: './show-songs-button.component.html',
  styleUrls: ['./show-songs-button.component.css']
})
export class ShowSongsButtonComponent implements OnInit {
  list_of_songs;
  selectedSongData;
  @Output() selectedSongDataEvent = new EventEmitter();
  
  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  getSongList(){
    this.httpService.get("listOfSongs", "").subscribe(
      res => {
        console.log(res);
        this.list_of_songs = res;

        this.list_of_songs.sort((a, b) =>
          a.title > b.title ? 1 : a.title < b.title ? -1 : 0
        );

        let dialogRef = this.dialog.open(SongListComponent, {data:{list_of_songs: this.list_of_songs}});
        dialogRef.afterClosed().subscribe(
          result => {
            this.selectedSongData = result;
            console.log(this.selectedSongData)
            this.selectedSongDataEvent.emit(this.selectedSongData)
          }
          )
        }
    );
  }
}
