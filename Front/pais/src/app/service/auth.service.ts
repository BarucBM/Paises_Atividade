import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser = {
    name:"",
    age: 0
  }

  url = "http://localhost:8080/"
  
  constructor(private httpClient: HttpClient) { }

  register(register:Register): Observable<Register>{
    return this.httpClient.post<Register>(this.url+"auth/register", register)
  }

  login(login:Login):Observable<Login> {
    return this.httpClient.post<Login>(this.url+"auth/login",login)
  }

  logout(){
     this.httpClient.post(this.url+"logout", {})
     localStorage.setItem("token", "")
  }

}
