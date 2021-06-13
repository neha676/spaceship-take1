import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';


interface Food {
  value: string;
  viewValue: string;
}
// interface Food1 {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent {
  panelOpenState = false;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
 
  // constructor() { }


}
