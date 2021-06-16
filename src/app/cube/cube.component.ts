import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
interface Planet {
  name: string;
  distance: number;
}
interface Person {
  token:string
}
// interface Food1 {
//   value: string;
//   viewValue: string;
// }


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
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
      "total_no":34,
      "max_distance":200,
      "speed":2
    }];
    showr  = true;
    showr1 = true;
    showr2  = true;
    showr3 = true;
  selectedValue = "";
  radioValue = "";
  radioValue1 ="";
  selectedValue1 ="";
  radioValue2 ="";
  selectedValue2 ="";
  radioValue3 ="";
  selectedValue3 ="";
  panelOpenState = false;
  planet_names = [{name:"hi"}];
    token ="";
  buttonGo =true;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  planets: Planet[] = [{ name: 'steak-0', distance: 34 }];


    p =['Donlon','Enchai','Jebing','Sapir'];
      v = ['Space pod','Space Rocket','Space Rocket','Space Rocket']
  // constructor() { }
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.getPlanet();
    this.getVehicles();
    this.getToken();
    
    // this.getToken();
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
  getToken(){
    const headers = { 'Accept': 'application/json'} 
    // myHeaders.append("Accept", " application/json ");
 
   this.httpClient.post<any>("https://findfalcone.herokuapp.com/token",{},{headers}).subscribe(
    (response) =>{
      this.token = response.token;
      console.log(response.token);
    console.log(this.token) }
   )
    // console.log(h)
    // console.log("sdzfsdzf ")
  }

  Find(){
    const headers = { 'Accept': 'application/json','Content-Type': 'application/json'} 
    // myHeaders.append("Accept", " application/json ");
    
   this.httpClient.post<any>("https://findfalcone.herokuapp.com/find",{"token":this.token,"planet_names":this.p,"vehicle_names":this.v},{headers}).subscribe(
    (response) =>{
      console.log(response); }
   )
    // console.log(h)
    // console.log("sdzfsdzf ")
  }


  checker(){
    if (this.selectedValue !="" &&this.selectedValue1 !="" && this.selectedValue2 !="" && this.selectedValue3 !=""){
      this.buttonGo =false;
    }
  }

  // selectedDevice = 'SDsDsdss';
  // showr= "true"
  //   onChange(newValue:string ) {
  //     console.log(newValue);
  //     this.selectedDevice = newValue;
  //     console.log(this.selectedDevice)
  //     // ... do other stuff here ...
  // }
  // onChange(value: string) {
   
  //   // this.showr=false;
  
  // }
  
  showRadio(value: string){
    this.checker();
    return this.showr = false;
  }

  showRadio1(value: string){
    this.checker();
    return this.showr1= false;
  }
  
  showRadio2(value: string){
    this.checker();
    return this.showr2 = false;
  }
  
  showRadio3(value: string){
    this.checker();
    return this.showr3 = false;
  }
  myClickFunction(){
    console.log("sdzsd")
    // this.getToken();
    // console.log(this.selectedValue)
    // console.log([this.selectedValue, this.selectedValue1])
    this.p.pop()
    this.p.pop()
    this.p.pop()
    this.p.pop()
    this.p.push(this.selectedValue,this.selectedValue1,this.selectedValue2,this.selectedValue3)
    this.v.pop()
    this.v.pop()
    this.v.pop()
    this.v.pop()
    this.v.push(this.radioValue,this.radioValue1,this.radioValue2,this.radioValue3)

    console.log(this.v)
    console.log(this.p)
        // this.planet_names.push(this.selectedValue);
  // this.planet_names.push(this.selectedValue);
    this.Find();
  }
}
