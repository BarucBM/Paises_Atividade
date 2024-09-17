import { Component, HostListener, OnInit } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  loggedUser = {
    name:"",
    age: 0
  }

  unlogged = false
  
  constructor(private router : Router, private authService:AuthService){}

  ngOnInit(): void {

    if(this.authService.loggedUser.name == null){
      this.loggedUser.name = "Guest"
      this.unlogged = false
    }else {
      this.loggedUser = this.authService.loggedUser
      this.unlogged = true
    }
    console.log(this.authService.loggedUser)
  }

  
  
  



}
