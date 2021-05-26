import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImagesService {

  apiUrl="https://localhost:44374/api/";
  constructor(private httpClient:HttpClient ) { }
  
  getBrands():Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
