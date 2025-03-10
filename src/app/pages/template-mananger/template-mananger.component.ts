import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TemplateSelectorComponent } from 'src/app/components/template-selector/template-selector.component';
import { MainHeaderComponent } from 'src/app/components/form/form-shared-components/main-header/main-header.component';
import { templateSelector } from 'src/app/shared/state/selectors/selected-template.selectors';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-template-mananger',
  templateUrl: './template-mananger.component.html',
  styleUrls: ['./template-mananger.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TemplateSelectorComponent,
    MainHeaderComponent,
    MatButtonModule
  ]
})
export class TemplateManangerComponent implements AfterViewInit, OnInit {
  storeSubscription!: Subscription;
  templateIsSelected: boolean = false;
  isMobile!: boolean;

  constructor(private store: Store, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  ngAfterViewInit(): void {
    this.storeSubscription = this.store.select(templateSelector).subscribe((templateId) => {
      if (templateId) {
        this.templateIsSelected = true;
      }
    })
  }
}
