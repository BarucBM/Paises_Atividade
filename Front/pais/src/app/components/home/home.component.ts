import { CommonModule } from '@angular/common';
import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthService } from '../../service/auth.service';

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
    '[style.--mdc-outlined-card-outline-color]':`'#AEEBFF'`

    }
})
export class HomeComponent {
  scrolled = false;
  scrollPosition = 0;

  constructor(private authService:AuthService){}

  @HostListener('scroll', ['$event'])
  onScroll(event:any) {
    this.scrollPosition = event.target.scrollTop;
  
    if (this.scrollPosition > 350) {
      console.log(this.scrollPosition)
      this.scrolled = true;
    } else {
      console.log(this.scrollPosition)
      this.scrolled = false;
    }
     
   }
}
