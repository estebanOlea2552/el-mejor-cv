import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MainHeaderComponent } from 'src/app/components/form/form-shared-components/main-header/main-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MainHeaderComponent
  ]
})
export class HomePageComponent implements OnInit, AfterViewInit {
  welcomeImages: string[] = [
    '../../../assets/images/welcome_man1.webp',
    '../../../assets/images/welcome_woman1.webp',
    '../../../assets/images/welcome_woman2.webp',
  ];
  professionalsImages: string[] = [
    '../../../assets/images/professionals_woman-headset.webp',
    '../../../assets/images/professionals_man-construction.webp',
    '../../../assets/images/professionals_man-suit.webp',
    '../../../assets/images/professionals_woman-chemistry.webp',
  ];
  welcomeCurrentIndex: number = 0;
  professionalsCurrentIndex: number = 0;
  welcomeAnimationState: string = 'in';
  professionalsAnimationState: string = 'in';
  firstLoadAnimationDone: boolean = false;
  showScrollButton = false;
  isMobile!: boolean;

  constructor(private breakpointObserver: BreakpointObserver){}
  
  ngOnInit(){
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches
      });
    }
    
  ngAfterViewInit(): void {
    this.firstLoadAnimationDone = true;
    setTimeout(() => {
      this.startSlideAnimation();
    }, 4000);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollButton = window.scrollY > 300; // Muestra cuando se baja 300px
  }
  
  startSlideAnimation(){
    setInterval(() => {
      this.welcomeAnimationState = 'out';
      this.professionalsAnimationState = 'out';
      setTimeout(() => {
        this.startWelcomeAnimation();
        this.startProfessionalsAnimation();
      }, 1000);
    }, 5000);
  }

  startWelcomeAnimation(){
    this.welcomeCurrentIndex = (this.welcomeCurrentIndex + 1) % this.welcomeImages.length;
    this.welcomeAnimationState = 'in';
  }
  startProfessionalsAnimation(){
    this.professionalsCurrentIndex = (this.professionalsCurrentIndex + 1) % this.professionalsImages.length;
    this.professionalsAnimationState = 'in';
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  


  
}
