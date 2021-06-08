import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/TokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  currentUserId:number;
  userName: string;
  roles: string[] = []

  apiUrl="https://localhost:44374/api/";
  constructor(private httpClient:HttpClient,private localStorage:LocalStorageService,private toastrService:ToastrService,
    private jwtHelper:JwtHelperService, private router:Router) {
      this.setUserStats();
     }

  login(user:LoginModel){
    this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/login",user).subscribe(res => {
      localStorage.setItem('token',res.data.token);
      setTimeout(function(){
        location.reload()
      },400)
      this.router.navigate(["/"])
      this.toastrService.success(res.message);
    },err=>{
      this.toastrService.error(err.error);
    })    
  }
  

  register(user:RegisterModel){
     this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/register",user).subscribe(res=>{
      this.localStorage.setToken(res.data.token)
      setTimeout(function(){
        location.reload()
      },400)
     })
  }

  LoggedIn():boolean{
    let isExpired=this.jwtHelper.isTokenExpired(localStorage.getItem('token'))
    return !isExpired
  }

  async setUserStats() {
    if (this.LoggedIn()) {
      this.setCurrentUserId();
      this.setUserName();
    }
  }

  setCurrentUserId() {
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter((x) =>
      x.endsWith('/nameidentifier')
    )[0];
    this.currentUserId = Number(decoded[propUserId]);
  }

  setUserName() {
    var decoded = this.getDecodedToken();
    var propUserName = Object.keys(decoded).filter((x) =>
      x.endsWith('/name')
    )[0];
    this.userName = decoded[propUserName];
  }

  getUserName(): string {
    return this.userName;
  }

  getUserId(): number {
    return this.currentUserId;
  }

  getDecodedToken() {
    try {
      return this.jwtHelper.decodeToken(
        this.localStorage.getToken()
      );
    } catch (Error) {
      return null;
    }
  }


  logout() {
    localStorage.removeItem('token');
  } 

  isAdmin(token: any) {
    let result = false;
    token.Claims?.toString()
      .split(',')
      ?.map((claim: string) => {
        if (claim.toLocaleLowerCase() === 'admin') {
          result = true;
        }
      });
    return result;
  }
}
