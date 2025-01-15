import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectTemplateTheme } from 'src/app/state/actions/selected-template.action';
import { AppState } from 'src/app/state/app.state';
import { templateSelector } from 'src/app/state/selectors/selected-template.selectors';

interface Theme {
  key: string,
  themeName: string,
  colors: string[]
}

const TEMPLATE_THEMES: Record<string, Theme[]> = {
  t01: [
    { key: 'theme01', themeName: 'black-n-white', colors: ['#000000', '#ffffff'] },
  ],
  t02: [
    { key: 'theme01', themeName: 'black-n-white', colors: ['#000000', '#efefef'] },
  ],
  t03: [
    { key: 'theme01', themeName: 'dulce-de-leche', colors: ['#C17767', '#D3B99F'] },
    { key: 'theme02', themeName: 'ice-blue', colors: ['#335899', '#9ABFEA'] },
    { key: 'theme03', themeName: 'light-cherry', colors: ['#802635', '#FA9189'] },
    { key: 'theme04', themeName: 'warm-violet', colors: ['#BCC2EB', '#9C7CA5'] },
    { key: 'theme05', themeName: 'jungle-green', colors: ['#1D9172', '#004D3D'] },
    { key: 'theme06', themeName: 'grey-scale', colors: ['#626262', '#dfdfdf'] },
  ],
  t04: [
    { key: 'theme01', themeName: 'snow-blue', colors: ['#337099', '#EEF1F6'] },
    { key: 'theme02', themeName: 'red-apple', colors: ['#7B0D1E', '#F8E5EE'] },
    { key: 'theme03', themeName: 'moss-green', colors: ['#417165', '#D5F6F1'] },
    { key: 'theme04', themeName: 'strong-yellow', colors: ['#FFD000', '#FFF4E4'] },
    { key: 'theme05', themeName: 'dark-lila', colors: ['#6752A1', '#F9F4F5'] },
    { key: 'theme06', themeName: 'grey-scale', colors: ['#505050', '#dfdfdf'] },
  ],
  t05: [
    { key: 'theme01', themeName: 'BnW', colors: ['#585858', '#c9c9c9'] },
    { key: 'theme02', themeName: 'BnW', colors: ['#66251F', '#ffc4bb'] },
    { key: 'theme03', themeName: 'BnW', colors: ['#0F4D4D', '#93e4d2'] },
    { key: 'theme04', themeName: 'BnW', colors: ['#0F2A4D', '#abc5f6'] },
    { key: 'theme05', themeName: 'BnW', colors: ['#4D240F', '#f3ea92'] },
    { key: 'theme06', themeName: 'BnW', colors: ['#aac4f5', '#ffc4bb'] },
  ]
}

@Component({
  selector: 'theme-selector',
  template: `
     <div
     class="button-container"
     [ngClass]="{'buttons-container-mobile': isMobile, 'buttons-container-desktop': !isMobile}">
      <div
      class="theme-button"
      [ngClass]="{'theme-button-mobile': isMobile, 'theme-button-desktop': !isMobile}"
      *ngFor="let button of themeButtons"
      (click)="selectTheme(button.key)">
        <!-- <div class="colors"> -->
          <div class="color-primary" [ngStyle]="{ 'background-color': button.colors[0] }"></div>
          <div class="color-secondary" [ngStyle]="{ 'background-color': button.colors[1] }"></div>
        <!-- </div> -->
      </div>
     </div>
  `,
  styles: [`
    .button-container {
      display: flex;
    }
    .buttons-container-desktop {
      flex-direction: column;
    }
    .buttons-container-mobile {
      flex-direction: row;
    }
    .theme-button {
      width: 2rem;
      height: 2rem;
      box-sizing: border-box;
      margin: auto;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      margin-top: .5rem;
      margin-bottom: .5rem;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }
    .theme-button-mobile {
      margin-left: .2rem;
      margin-right: .2rem;
    }
    .theme-button-desktop {
      margin-top: .5rem;
      margin-bottom: .5rem;
    }
    .theme-button:hover {
      transform: scale(1.1);
      box-shadow: 2px 2px 4px -4px rgba(0,0,0,0.5);
    }
    .color-primary, .color-secondary {
      box-sizing: border-box;
      width: 50%;
      height: 100%;
    }
  `],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})

export class ThemeSelectorComponent implements OnInit, OnDestroy {
  private selectedTemplateSubscription!: Subscription;
  protected themeButtons: Theme[] = [];
  protected isMobile!: boolean;

  constructor(private store: Store<AppState>, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.selectedTemplateSubscription = this.store.select(templateSelector).subscribe((templateId: string) => {
      this.themeButtons = TEMPLATE_THEMES[templateId] || [];
    })

    // Detect mobile devices
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(
        result => this.isMobile = result.matches
      );
  }

  // NGRX Template theme selector
  protected selectTheme(theme: string): void {
    this.store.dispatch(
      selectTemplateTheme({ theme: theme })
    )
  }

  ngOnDestroy(): void {
    if (this.selectedTemplateSubscription) {
      this.selectedTemplateSubscription.unsubscribe();
    }
  }
}
