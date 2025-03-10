import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'main-header',
  template: `
    <header
    class="header"
    [ngClass]="{'header-desktop': !isMobile, 'animate': firstLoadAnimationDone}">
        <div
        class="logo-container"
        [ngClass]="{'logo-container-mobile': isMobile, 'logo-container-desktop': !isMobile}"
        routerLink="/">
          <img src="../../../../../assets/images/logo.webp" alt="">
          <h1>El Mejor <span>CV</span></h1>
        </div>
        <div class="coffee-container">
          <a
          href='https://cafecito.app/3steban-0lea_dev'
          rel='noopener'
          target='_blank'>
            <img
            *ngIf="!isMobile"
            srcset='https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x'
            src='https://cdn.cafecito.app/imgs/buttons/button_1.png'
            alt='Invitame un café en cafecito.app'/>
            <img
            class="coffee-logo-mobile"
            *ngIf="isMobile"
            src='https://cdn.cafecito.app/imgs/cafecito_logo.svg'>
          </a>
        </div>
    </header>
  `,
  styles: [`
      .header {
        width: 90vw;
        height: 6vh;
        position: absolute;
        left: 5vw;
        top: 1rem;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background-color: var(--white);
        padding-left: 5%;
        padding-right: 5%;
        z-index: 3;
        border-radius: 1rem;
        box-shadow: 
        0px 1px 3px rgba(0, 0, 0, 0.2), 
        0px 1px 2px rgba(0, 0, 0, 0.12);
      }
      .header-desktop {
        width: 80vw;
        height: 9vh;
        left: 10vw;
      }
      .logo-container {
        height: 6vh;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-top: auto;
        margin-bottom: auto;
      }
      .logo-container-desktop {
        grid-column: 1 / 2;
      }
      .logo-container-mobile {
        grid-column: 1 / 3;
      }
      .logo-container-desktop img {
        height: 3rem;
        width: 3rem;
        margin-right: .5rem;
      }
      .logo-container-mobile img {
        height: 2rem;
        width: 2rem;
        margin-right: .5rem;
      }
      .logo-container h1 {
        font-family: 'Bricolage', sans-serif;
        color: var(--black);
        font-weight: 900;
        margin-top: 1rem;
        span {
          color: var(--jasmine-yellow);
        }
      }
      .logo-container-desktop h1 {
        font-size: 1.5rem;
      }
      .logo-container-mobile h1 {
        font-size: 1rem;
      }
      .coffee-container {
        grid-column: 3 / 4;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: end;
        align-items: center;
      }
      .coffee-logo-mobile {
        height: 2rem;
        width: 2rem;
      }
    `],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class MainHeaderComponent implements OnInit, AfterViewInit{
  @Input() componentTitle: string = '';
  firstLoadAnimationDone: boolean = false;
  isMobile!: boolean;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }
   
  ngAfterViewInit(): void {
    this.firstLoadAnimationDone = true;
  }
}
