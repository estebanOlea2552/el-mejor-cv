import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MainHeaderComponent } from 'src/app/shared/main-header/main-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MainHeaderComponent
  ]
})
export class HomePageComponent {
  
  constructor(private router: Router){}
  
  navigateTo(route: any) {
    this.router.navigate([route]);
  }
}
