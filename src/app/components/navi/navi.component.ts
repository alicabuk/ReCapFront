import { typeSourceSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  userLogged: boolean
  userName: string
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserName()
    this.setUserLogged()
  }

  getUserName(){
    this.userName = this.authService.getUserName();
  }

  logout(){
    this.authService.logout();
    window.location.reload();

  }

  setUserLogged() {
    this.userLogged = this.authService.LoggedIn();
  }

}
