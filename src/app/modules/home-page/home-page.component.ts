import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class HomePageComponent {
  
  constructor(private router: Router){}
  
  navigateTo(route: any) {
    this.router.navigate([route]);
  }
}
