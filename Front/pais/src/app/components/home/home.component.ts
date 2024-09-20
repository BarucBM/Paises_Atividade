import { CommonModule } from '@angular/common';
import { Component, HostListener, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthService } from '../../service/auth.service';
import { PostService } from '../../service/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule,MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host:{'[style.--mat-tab-header-divider-color]':`'transparent'`,
    '[style.--mdc-tab-indicator-active-indicator-height]':`'0'`,
    '[style.--mdc-outlined-card-container-shape]':`'0.5' + "rem"`,
    '[style.--mat-app-corner-medium]':`'1'`,
    '[style.--mdc-outlined-card-outline-color]':`'#AEEBFF'`,
    '[style.--mat-tab-header-inactive-label-text-color]':`'#F0EAD6'`,
    '[style.--mat-tab-header-active-label-text-color]':`'#D52B1E'`,
    '[style.--mat-tab-header-active-focus-label-text-color]':`'#D52B1E'`
    }
})
export class HomeComponent implements OnInit{
  scrolled = false;
  scrollPosition = 0;
  curiosity:any;
  sport:any;
  culture:any;

  constructor(private authService:AuthService, private postService:PostService){}
  ngOnInit(): void {
    
  }

  @HostListener('scroll', ['$event'])
  onScroll(event:any) {
    this.scrollPosition = event.target.scrollTop;
    if (this.scrollPosition > 10) {
      this.getAllPosts();
    } 

    if (this.scrollPosition > 350) {
 
      this.scrolled = true;
    } else {

      this.scrolled = false;
    }
     
   }

   getAllPosts(){
    this.postService.getAllPosts().subscribe({
      next:(res)=>{
        if (typeof localStorage !== 'undefined') {
          this.curiosity = res.find(item => item.category == "CURIOSITY");
          this.sport = res.find(item => item.category == "SPORTS");
          this.culture = res.find(item => item.category == "CULTURE");
        } else {
          console.warn('localStorage não está disponível.');
        }
      },
      error: (e) => console.log(e)
    });
    
  }
}
