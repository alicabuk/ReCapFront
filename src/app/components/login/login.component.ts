import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from "@angular/forms";
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      Email: ["",Validators.required],
      Password: ["",Validators.required]
    });
  }

  login(){
    let loginModel=Object.assign({},this.loginForm.value)
    this.authService.login(loginModel)
  }

}
