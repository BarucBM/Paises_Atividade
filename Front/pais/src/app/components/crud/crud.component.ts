import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { PostService } from '../../service/post.service';
import { Post } from '../../models/post';
import { CuriosityPopupComponent } from './curiosity-popup/curiosity-popup.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CommonModule, CuriosityPopupComponent],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
  host:{'[style.--mdc-filled-text-field-container-color]':`'#F0EAD6'`,
    '[style.--mdc-filled-text-field-input-text-color]':`'#141414'`
}})
export class CrudComponent implements OnInit {
  selectedEntity =""

  posts: Post[] = [];

  selectedPosts: Post[] = [];

  isModelOpen = false;

  post!:Post;


  constructor(private postService: PostService, private toastService:ToastrService){}

  ngOnInit(): void {  
    
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe({
      next:(res)=>{
        this.posts = res
        this.onSelection(this.selectedEntity)
      },
      error:(e) => console.log(e)
    })
  }

  editEntity(post:Post){
    this.post = post
    this.openModel();
  }

  deletePost(id:number){
    this.postService.deletePost(id).subscribe({
      next:()=>{
        this.toastService.success("Deleted!")
        this.getAllPosts()
      },
      error:(e)=> {
        this.toastService.success("Deleted!")
        console.log(e)
        this.getAllPosts()
      }
    })
  }


  onSelection(value:string){
    
    this.selectedEntity = value
    this.selectedPosts = []
    this.selectedPosts = this.posts.filter(post => post.category == value
    )
  }
 
  openModel(){
    this.isModelOpen = true
  }

  onCloseModel(){
    this.getAllPosts()
    this.isModelOpen = false
    this.onSelection(this.selectedEntity)
  }

}
