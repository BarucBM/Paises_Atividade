import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-culture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './culture.component.html',
  styleUrl: './culture.component.css'
})
export class CultureComponent {
  posts:Post[] =[]

  constructor(private postService:PostService, private renderer: Renderer2){}

  ngOnInit(): void {
    this.renderer.listen('window', 'load', () => {
      this.getAllCuriosities();
    });
  }


  getAllCuriosities(){
    this.postService.getAllPosts().subscribe({
      next:(res) =>{
        this.posts = res.filter(post => post.category == "CULTURE")
        console.log(this.posts)
      }})
  }
}
