import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'main-header',
  template: `
    <header class="header">
        <div class="logo-container">
          <h1>CV-Maker</h1>
        </div>
        <div class="container">

        </div>
    </header>
  `,
  styles: [`
      .header {
        width: 100%;
        height: 10%;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        display: grid;
        grid-template-columns: 15% auto;
      }
      .logo-container {
        background-color: grey;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .container {
        /* background-color: var(--light-gray); */
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
