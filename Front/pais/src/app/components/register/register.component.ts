import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Register } from '../../models/register';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  register: Register = {
    login: "",
    password: "",
    role:"CUSTOMER",
    name:"",
    age:0
  }

  showPass:string = "password"

  constructor(private authService:AuthService, private router: Router){}

  ngOnInit(): void {
    this.authService.logout();
  }

  onLogin(){
    this.authService.register(this.register).subscribe({
      next: (res:any)=> {
          alert("Registrado com sucesso!")
          this.router.navigateByUrl('login')  
      },

      error: (res:any) => alert("Falha no registro")

    })
  }

  showPassword(){
    if(this.showPass == "password"){
      this.showPass = "text"
    }else if(this.showPass == "text"){
      this.showPass = "password"
    }
  }
}
