import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TemplateSelectorComponent } from 'src/app/components/template-selector/template-selector.component';
import { MainHeaderComponent } from 'src/app/shared/main-header/main-header.component';
import { templateSelector } from 'src/app/state/selectors/selected-template.selectors';

@Component({
  selector: 'app-template-mananger',
  templateUrl: './template-mananger.component.html',
  styleUrls: ['./template-mananger.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TemplateSelectorComponent,
    MainHeaderComponent,
    MatButtonModule
  ]
})
export class TemplateManangerComponent implements AfterViewInit {
  storeSubscription!: Subscription;
  templateIsSelected: boolean = false;

  constructor(private store: Store) { }

  ngAfterViewInit(): void {
    this.storeSubscription = this.store.select(templateSelector).subscribe((templateId) => {
      if (templateId) {
        this.templateIsSelected = true;
      }
    })
  }
}
