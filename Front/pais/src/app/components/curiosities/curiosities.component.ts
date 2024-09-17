import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'curiosities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curiosities.component.html',
  styleUrl: './curiosities.component.css'
})
export class CuriositiesComponent {
  curiosities:Post[] =[]
  constructor(private postService:PostService){}

  getAllCuriosities(){
    this.postService.getAllPosts().subscribe({
      next:(res) =>{
        this.curiosities = res.filter(post => post.category == "CURIOSITY")
        console.log(this.curiosities)
      }})
  }
}
