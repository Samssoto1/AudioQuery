import { Component, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private elementRef: ElementRef) { 
  }

  ngOnInit(): void {
    // this.elementRef.nativeElement.querySelector('#galaxy-background').addEventListener('mousemove', this.moveImgs.bind(this));
  }

  moveImgs(e){
    var valueX = e.pageX * (-1 / 12);
    var valueY = e.pageY * (-1 / 12);
    e.style.backgroundPositionX = valueX + "px";
    e.style.backgroundPositionY = valueY + "px";
    console.log(valueX);
    console.log(valueY);
    e.style.backgroundPositionX = valueX + "px"
    e.style.backgroundPositionY = valueY + "px"
  }

  moveImg(e){
    var valueX = (this.elementRef.nativeElement.querySelector('#galaxy-background').pageX * -1 / 12);
    var valueY = (this.elementRef.nativeElement.querySelector('#galaxy-background').pageY * -1 / 12);
    this.elementRef.nativeElement.querySelector('#galaxy-background').style.backgroundPositionX = valueX + "px";
    this.elementRef.nativeElement.querySelector('#galaxy-background').style.backgroundPositionY = valueY + "px";
    console.log(valueX);
    console.log(valueY);
    // this.style.backgroundPositionX = valueX + "px"
    // this.style.backgroundPositionY = valueY + "px"
  }

}
