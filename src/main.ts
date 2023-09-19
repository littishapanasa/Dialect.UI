import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

import { initializeApp } from 'firebase/app';
initializeApp(environment.firebase);
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));