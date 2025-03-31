import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTemplateLang } from 'src/app/shared/state/actions/template-lang.action';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
  selector: 'template-lang-selector',
  template: `
    <div class="lang-selector-container" [ngClass]="{ desktop: !isMobile }">
      <button
        class="lang-button"
        [ngClass]="{ 'lang-button-checked': activeLanguage === 'spanish' }"
        (click)="selectTemplateLang('spanish')"
      >
        ES
      </button>
      <button
        class="lang-button"
        [ngClass]="{ 'lang-button-checked': activeLanguage === 'english' }"
        (click)="selectTemplateLang('english')"
      >
        EN
      </button>
    </div>
  `,
  styles: [
    `
      .lang-selector-container {
        width: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .desktop.lang-selector-container {
        height: 5rem;
        width: auto;
        margin-bottom: 3rem;
        margin-top: auto;
        flex-direction: column;
      }

      .lang-button {
        width: 2rem;
        height: 2rem;
        font-size: .8rem;
        font-family: var(--bricolage);
        font-weight: 600;
        color: var(--medium-grey);
        cursor: pointer;
        background-color: var(--black-overlay);
        border-radius: 50%;
        padding: 0.5rem;
        border: none;
        transition: 0.1s ease-in-out;
      }

      .desktop .lang-button {
        width: auto;
        height: auto;
        font-size: 1rem;
      }

      .lang-button:hover {
        box-shadow: 2px 2px 2px var(--black-overlay);
      }

      .lang-button-checked {
        background-color: var(--white-variant);
        transform: scale(1.05);
        color: var(--black);
        box-shadow: 2px 2px 2px var(--black-overlay);
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class TemplateLangSelectorComponent implements OnInit {
  activeLanguage!: string;
  isMobile!: boolean;

  constructor(
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.selectTemplateLang('spanish'); //Initializes the template with a default language
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result) => (this.isMobile = result.matches));
  }

  selectTemplateLang(lang: string): void {
    this.store.dispatch(selectTemplateLang({ lang: lang }));
    this.activeLanguage = lang;
  }
}
