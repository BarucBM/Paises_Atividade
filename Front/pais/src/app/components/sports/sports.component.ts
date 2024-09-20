import { Component, Renderer2 } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sports.component.html',
  styleUrl: './sports.component.css'
})
export class SportsComponent {
  posts:Post[] =[]

  constructor(private postService:PostService, private renderer: Renderer2, private router:Router, private notify:ToastrService){}

  ngOnInit(): void {
    this.renderer.listen('window', 'load', () => {
      this.getAllCuriosities();
    });
  }


  getAllCuriosities(){
    this.postService.getAllPosts().subscribe({
      next:(res) =>{
        this.posts = res.filter(post => post.category == "SPORTS")
        console.log(this.posts)
      },
    error:(e)=>{
      
      this.notify.warning("You need to login to see this page!","",
        {
          "timeOut": 4000, 
          "progressBar": true
        }
      )
    }
    })
  }
}

