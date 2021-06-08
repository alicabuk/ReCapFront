import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: number
  userDetail: UserDetail
  constructor(private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getUserId()
    this.getUserDetailsById(this.userId)
  }

  getUserId(){
    this.userId = this.authService.getUserId();
  }

  getUserDetailsById(id:number){
     this.userService.getUserDetailsById(id).subscribe(response=>{
       this.userDetail = response.data[0]
     })
  }

}
