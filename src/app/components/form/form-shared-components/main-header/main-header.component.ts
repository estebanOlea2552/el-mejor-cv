import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-header',
  template: `
    <header class="header">
        <div class="logo-container">
          <img src="../../../../../assets/images/logo.svg" alt="">
          <h1>El Mejor <span>CV</span></h1>
        </div>
        <div class="container">
          <a
          href='https://cafecito.app/3steban-0lea_dev'
          rel='noopener'
          target='_blank'>
            <img srcset='https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_1.png' alt='Invitame un café en cafecito.app' />
          </a>
        </div>
    </header>
  `,
  styles: [`
      .header {
        width: 100%;
        height: 9vh;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 15% auto;
        background-color: var(--marian-blue);
        padding-left: 5%;
        padding-right: 5%;
      }
      .logo-container {
        height: 9vh;
        width: auto;  
        box-sizing: border-box;
        display: flex;
        align-items: center;
      }
      .logo-container img {
        max-height: 100%;
        border-radius: 1rem;
        padding-left: 1rem;
      }
      .logo-container h1 {
        color: #fff;
        margin-top: 1rem;
        font-weight: 600;
        span {
          color: var(--tea-green);
        }
      }
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: end;
        align-items: center;
      }
    `],
    standalone: true,
    imports: []
})
export class MainHeaderComponent implements OnInit {
  @Input() componentTitle: string = '';

  constructor() { }

  ngOnInit() {
  }

}
