import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './app/state/app.state';
import { APP_ROUTES } from './app/appRoutes';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(APP_ROUTES),
    provideStore(ROOT_REDUCERS),
    provideStoreDevtools({ name: 'TEST' }) // Configuración de DevTools
  ]
}).catch(err => console.error(err));