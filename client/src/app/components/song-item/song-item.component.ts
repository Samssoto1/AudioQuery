import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit {
  @Input() songData;
  @Output() selectedSong = new EventEmitter<string>();
  constructor() { }



  ngOnInit(): void {
  }

  getValue(songData){
    console.log(songData);
    this.selectedSong.emit(songData);
    console.log('emitted')
  }

}
