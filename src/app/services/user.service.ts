import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/ResponseModel';
import { User } from '../models/user';
import { UserDetail } from '../models/userDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44374/api/users/";

  constructor(private httpClient: HttpClient) { }

  getUserDetailsByEmail(email: string): Observable<ListResponseModel<UserDetail>>{
    let newPath = this.apiUrl + 'getuserdetailsbyemail?email=' + email;
    return this.httpClient.get<ListResponseModel<UserDetail>>(newPath);
  }

  getUserDetailsById(id: number): Observable<ListResponseModel<UserDetail>>{
    let newPath = this.apiUrl + 'getuserdetailsbyid?id=' + id;
    return this.httpClient.get<ListResponseModel<UserDetail>>(newPath);
  }

  update(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', user);
  }
}
