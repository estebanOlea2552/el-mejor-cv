import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CvEditorModule } from './modules/cv-editor/cv-editor.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CvEditorModule,
  ]
})
export class AppComponent {
  title = 'cv-maker-online';
}
