import { Component, OnInit, Renderer2  } from '@angular/core';
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
export class CuriositiesComponent implements OnInit {
  curiosities:Post[] =[]

  constructor(private postService:PostService, private renderer: Renderer2){}

  ngOnInit(): void {
    this.renderer.listen('window', 'load', () => {
      this.getAllCuriosities();
    });
  }


  getAllCuriosities(){
    this.postService.getAllPosts().subscribe({
      next:(res) =>{
        this.curiosities = res.filter(post => post.category == "CURIOSITY")
        console.log(this.curiosities)
      }})
  }
}
