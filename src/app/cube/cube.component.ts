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
  vehicles: any[] = [
    {
      "name": "Douglas  Pace",
      "total_no":34,
      "max_distance":200,
      "speed":2
    }];
    showr  = true;
  selectedValue: Planet[] = [{ name: 'steak-0', distance: 34 }];
  panelOpenState = false;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  planets: Planet[] = [{ name: 'steak-0', distance: 34 }];

  // constructor() { }
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.getPlanet();
    this.getVehicles();
    console.log(this.planets[0]);
    console.log(this.showr);
  }

  getPlanet() {
    this.httpClient
      .get<any>('https://findfalcone.herokuapp.com/planets')
      .subscribe((response) => {
        console.log(response);
        this.planets = response;
      });
  }
  getVehicles(){
    this.httpClient.get<any>("https://findfalcone.herokuapp.com/vehicles").subscribe(
      response =>{
        console.log(response);
        this.vehicles =response;
      }
    )
  }
  selectedDevice = 'SDsDsdss';
  // showr= "true"
  //   onChange(newValue:string ) {
  //     console.log(newValue);
  //     this.selectedDevice = newValue;
  //     console.log(this.selectedDevice)
  //     // ... do other stuff here ...
  // }
  onChange(value: string) {
    console.log(value);
    console.log(this.selectedValue)
    this.showr=false;
    console.log(this.showr)
    this.panelOpenState= true;
  }
  showradio(){
    return this.showr;
  }
}
