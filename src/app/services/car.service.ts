import { HttpClient } from '@angular/common/http'; //back end datasına ulaşılması sağlanıyor.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44374/api/";
  constructor(private httpClient:HttpClient ) { }
  
  getCarsDetails():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }  
}
