import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from '../models/CustomerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44374/api/customers/getall";
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>(this.apiUrl);
  }
}
