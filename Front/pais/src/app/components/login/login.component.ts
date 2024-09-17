import { Component, inject, NgModule, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import {FormsModule} from '@angular/forms'
import { AuthService } from '../../service/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  login: Login = {
    login: "",
    password: ""
  }

  constructor(private authService:AuthService, private router: Router, private toastService:ToastrService ){}

  ngOnInit(): void {
    this.authService.logout();
  }

  onLogin(){
    this.authService.login(this.login).subscribe({
      next: (res:any)=> {
        this.authService.loggedUser.name = res.name;
        this.authService.loggedUser.age = res.age;
        
        localStorage.setItem("token", res.token)
        this.toastService.success("Logged in!")
        this.router.navigateByUrl('home')  
      },

      error: (res:any) => this.toastService.error("Credentials invalid! Try again.")

    })
  }

}
