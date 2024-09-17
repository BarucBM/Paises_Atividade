import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Post } from '../../../models/post';
import { PostService } from '../../../service/post.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-curiosity-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './curiosity-popup.component.html',
  styleUrl: './curiosity-popup.component.css'
})
export class CuriosityPopupComponent implements OnChanges {
  curiosityForm :FormGroup
  @Input() isOpen = false
  @Input() data: Post | null = null
  @Input() selectedEntity = ""
  @Output() closeModel = new EventEmitter()
 

  isDropDownOpen = false;

  constructor(private formBuilder:FormBuilder, private postService:PostService, private notify:ToastrService){
    this.curiosityForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      category: "",
      descriptions: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required])
    })
  }

  ngOnChanges(): void {    

    if (this.data) {
      this.curiosityForm.patchValue(this.data)
    }
  }

  onClose() {
    this.closeModel.emit(false)
    this.data = null
    this.curiosityForm.reset()
  }


  onSubmit() {
    
    if (this.selectedEntity == "") {
      this.notify.error("Category not selected!")
      this.onClose()
    }else{
      this.curiosityForm.patchValue({
        category: this.selectedEntity
      });
      console.log(this.curiosityForm.value)
      if (this.curiosityForm.valid) {
        console.log(this.curiosityForm.value)
        if (this.data) {

          this.postService.updatePost(this.data.id as number, this.curiosityForm.value)
          .subscribe({
            next:() =>{
              this.notify.success("Post updated!")
              this.onClose()
            }
          })       
        }else{
          this.postService.addPost(this.curiosityForm.value).subscribe({
            next: () => {
              this.notify.success("Post created!")
              this.onClose()
            }
          })
        }
      } else {
        this.curiosityForm.markAllAsTouched()
      }
    }
  }


  toggleDropDown(){
    this.isDropDownOpen = !this.isDropDownOpen
  }
}
