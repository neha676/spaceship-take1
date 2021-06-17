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


  // selectedPlanets =[];

  

  panelOpenState = false;
  token = "";
  buttonGo = false;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  planets: Planet[] = [];
  status ="";

  planet_names = ['Donlon', 'Enchai', 'Jebing', 'Sapir'];
  vehicle_names = ['Space pod', 'Space Rocket', 'Space Rocket', 'Space Rocket']

  selectedPlanets: { [i: number]: string }  = {};
  selectedVehicles: { [i: number]:  string } = {};

  previousSection=0;
  previousButton="";


  planet_data: {[i:string ]:number} ={};

  
  vehicle_data: {[i:string ]:number} ={};
  vehicle_speed: {[i:string ]:number} ={}
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
        for (let i = 0; i <response.length; i++) {
          this.planet_data[response[i].name]=response[i].distance;
        }
        console.log(this.planet_data);
      });
  }
  getVehicles() {
    this.httpClient.get<any>("https://findfalcone.herokuapp.com/vehicles").subscribe(
      response => {
        console.log(response);
        this.vehicles = response;
        for (let i = 0; i <response.length; i++) {
          this.vehicle_data[response[i].name]=response[i].max_distance;
          this.vehicle_speed[response[i].name]=response[i].speed;
          
        }
        console.log(this.vehicle_data);
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

    showpod( current_planet_name :string, current_vehicle_name:string) {

    if(!current_planet_name)
    return true
    let currentvehicledistance = this.vehicle_data[current_vehicle_name]
    // console.log(current_vehicle_name)
    // console.log(currentvehicledistance)
    // console.log(current_planet_name)
    // console.log( this.planet_data[current_planet_name])
    
    if (currentvehicledistance < this.planet_data[current_planet_name])
   return true;
    
    return false;
  }
  // checker(value: string) {
  //   console.log(value);
    
  //   for (let vehicle of  this.vehicles){
  //     if(vehicle.name == value){
  //       vehicle.total_no = vehicle.total_no - 1;
  //     }
  //   }


  //   if (this.selectedValue != "" && this.selectedValue1 != "" && this.selectedValue2 != "" && this.selectedValue3 != "" && this.radioValue != "" && this.radioValue1 != "" && this.radioValue2 != "" && this.radioValue3 != ""   ) {
      
  //     this.buttonGo = false;
  //   }
  // }
  check(value: any, i :number){

    this.buttonGo =true;
    // console.log(this.previousButton);
      // this.previousButton = this.selectedVehicles[i];
      this.selectedVehicles[i] = value;
for ( i =1 ; i <=4 ; i++ )
{
  // console.log('checkin',i)
  if ( !(i in this.selectedVehicles)){
    this.buttonGo = false;
    break;

  }
}   
      

  }
  openGroup(value: number){
    // this.previousButton = "";
    if(this.previousSection != 0){
      //calcualte
      let veh_to_remo= this.selectedVehicles[this.previousSection]
      let veh_to_add= this.selectedVehicles[value]
     

      for (let i=0;i<this.vehicles.length;i++)
      {   
          if(this.vehicles[i].name===veh_to_remo){this.vehicles[i].total_no--}
          if(veh_to_add && this.vehicles[i].name===veh_to_add){this.vehicles[i].total_no++}

      }

    }
    this.previousSection=value;
  }


  showplanets( planet :string){
// console.log(this.selectedPlanets)
let show = true ; 
// console.log("checking planet:",planet) 
    for(let i=0; i<=4;i++){
      // console.log("checking ",this.selectedPlanets[i])
      if ( this.selectedPlanets[i] && planet ==this.selectedPlanets[i]){
        // console.log("setting to false")
        return false;
      }
      
      // console.log(this.selectedPlanets[i])
    }
    return true;
    // console.log(Object.keys(this.selectedPlanets))
    // if(planet in  Object.keys(this.selectedPlanets).map(key => this.selectedPlanets[key])){
    //   return true;
    // }
    // else return false;
  }

  showRadio(value: string, i:number) {
    this.selectedVehicles[i]=""
    this.buttonGo=false;

    // this.checker(value);
    
  }


  showBox(value: string){
    // this.checker(value);
  }
  myClickFunction() {
    this.planet_names.pop()
    this.planet_names.pop()
    this.planet_names.pop()
    this.planet_names.pop()
    // this.planet_names.push(this.selectedValue, this.selectedValue1, this.selectedValue2, this.selectedValue3)
    console.log(this.selectedPlanets)
    // this.vehicle_names.push(this.radioValue, this.radioValue1, this.radioValue2, this.radioValue3)
    console.log("planet_names:" + this.planet_names)
    console.log("vehicle_names:" + this.vehicle_names)
    this.Find();
  }
}
