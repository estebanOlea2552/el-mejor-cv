import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TemplateSelectorComponent } from 'src/app/components/template-selector/template-selector.component';
import { templateSelector } from 'src/app/state/selectors/template.selectors';

@Component({
  selector: 'app-template-mananger',
  templateUrl: './template-mananger.component.html',
  styleUrls: ['./template-mananger.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TemplateSelectorComponent,
    MatButtonModule
  ]
})
export class TemplateManangerComponent implements AfterViewInit {
  storeSubscription!: Subscription;
  templateIsSelected: boolean = false;

  constructor(private router: Router, private store: Store) { }

  ngAfterViewInit(): void {
    this.storeSubscription = this.store.select(templateSelector).subscribe((templateId) => {
      if (templateId) {
        this.templateIsSelected = true;
      }
    })
  }

  navigateTo(route: any) {
    this.router.navigate([route]);
  }
}
