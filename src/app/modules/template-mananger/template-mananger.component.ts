import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-mananger',
  templateUrl: './template-mananger.component.html',
  styleUrls: ['./template-mananger.component.css']
})
export class TemplateManangerComponent {

  constructor(private router: Router) { }

  navigateTo(route: any) {
    this.router.navigate([route]);
  }
}
