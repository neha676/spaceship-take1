import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Planet {
  name: string;
  distance: number;
}

// interface Food1 {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css'],
})
export class CubeComponent {
  selectedValue: Planet[] = [{ name: 'steak-0', distance: 34 }];
  panelOpenState = false;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  planets: Planet[] = [{ name: 'steak-0', distance: 34 }];

  // constructor() { }
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.getPlanet();
    console.log(this.planets[0]);
  }

  getPlanet() {
    this.httpClient
      .get<any>('https://findfalcone.herokuapp.com/planets')
      .subscribe((response) => {
        console.log(response);
        this.planets = response;
      });
  }
  selectedDevice = 'SDsDsdss';
  //   onChange(newValue:string ) {
  //     console.log(newValue);
  //     this.selectedDevice = newValue;
  //     console.log(this.selectedDevice)
  //     // ... do other stuff here ...
  // }
  onChange(value: string) {
    console.log(value);
    this.panelOpenState= true;
  }
}
