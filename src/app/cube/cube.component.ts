import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
interface Planet {
  name: string;
  distance: number;
}
interface Person {
  token: string
}
// interface Food1 {
//   value: string;
//   viewValue: string;
// }


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css'],
})
export class CubeComponent {

  vehicles: any[] = [
    {
      "name": "Douglas  Pace",
      "total_no": 34,
      "max_distance": 200,
      "speed": 2
    }];
  showr = true;
  showr1 = true;
  showr2 = true;
  showr3 = true;
  selectedValue = "";
  radioValue = "";
  radioValue1 = "";
  selectedValue1 = "";
  radioValue2 = "";
  selectedValue2 = "";
  radioValue3 = "";
  selectedValue3 = "";
  panelOpenState = false;
  token = "";
  buttonGo = true;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  planets: Planet[] = [];
status ="";

  planet_names = ['Donlon', 'Enchai', 'Jebing', 'Sapir'];
  vehicle_names = ['Space pod', 'Space Rocket', 'Space Rocket', 'Space Rocket']





  // constructor() { }
  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.getPlanet();
    this.getVehicles();
    this.getToken();
  }

  getPlanet() {
    this.httpClient
      .get<any>('https://findfalcone.herokuapp.com/planets')
      .subscribe((response) => {
        console.log(response);
        this.planets = response;
      });
  }
  getVehicles() {
    this.httpClient.get<any>("https://findfalcone.herokuapp.com/vehicles").subscribe(
      response => {
        console.log(response);
        this.vehicles = response;
      }
    )
  }
  getToken() {
    const headers = { 'Accept': 'application/json' }

    this.httpClient.post<any>("https://findfalcone.herokuapp.com/token", {}, { headers }).subscribe(
      (response) => {
        this.token = response.token;
        console.log(this.token)
      }
    )
 
  }

  Find() {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    this.httpClient.post<any>("https://findfalcone.herokuapp.com/find", { "token": this.token, "planet_names": this.planet_names, "vehicle_names": this.vehicle_names }, { headers }).subscribe(
      (response) => {
        console.log(response);
        this.status =response.status;
      }
    )
  }


  checker() {
    if (this.selectedValue != "" && this.selectedValue1 != "" && this.selectedValue2 != "" && this.selectedValue3 != "" && this.radioValue != "" && this.radioValue1 != "" && this.radioValue2 != "" && this.radioValue3 != ""   ) {
      
      this.buttonGo = false;
    }
  }


  showRadio(value: string) {
    this.checker();
    return this.showr = false;
  }

  showRadio1(value: string) {
    this.checker();
    return this.showr1 = false;
  }

  showRadio2(value: string) {
    this.checker();
    return this.showr2 = false;
  }

  showRadio3(value: string) {
    this.checker();
    return this.showr3 = false;
  }


  showBox(value: string){
    this.checker();
  }
  myClickFunction() {
    this.planet_names.pop()
    this.planet_names.pop()
    this.planet_names.pop()
    this.planet_names.pop()
    this.planet_names.push(this.selectedValue, this.selectedValue1, this.selectedValue2, this.selectedValue3)
    
    this.vehicle_names.pop()
    this.vehicle_names.pop()
    this.vehicle_names.pop()
    this.vehicle_names.pop()
    
    this.vehicle_names.push(this.radioValue, this.radioValue1, this.radioValue2, this.radioValue3)
    console.log("planet_names:" + this.planet_names)
    console.log("vehicle_names:" + this.vehicle_names)
    this.Find();
  }
}
