import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-default-preview-screen',
  templateUrl: './default-preview-screen.component.html',
  styleUrls: ['./default-preview-screen.component.css'],
  standalone: true,
  imports: [RouterLink, MatButtonModule]
})
export class DefaultPreviewScreenComponent implements OnInit {

  constructor() { }

  ngOnInit():void {
  
  }

}
