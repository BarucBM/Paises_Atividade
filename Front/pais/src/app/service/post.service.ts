import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
    url = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  getAllPosts():Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.url+"post")
  }

  addPost(post:Post):Observable<ApiResponse<Post>>{
    return this.httpClient.post<ApiResponse<Post>>(this.url+"post", post)
  }

  updatePost(id:Number, post:Post):Observable<ApiResponse<Post>>{
    return this.httpClient.put<ApiResponse<Post>>(`${this.url}post/${id}`, post)
  }

  deletePost(id:Number):Observable<any>{
    return this.httpClient.delete<any>(`${this.url}post/${id}`)
  }
}
