import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { TitleStrategy, provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { LocalizedTitleStrategy } from './app/core/title.strategy';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })),
        { provide: TitleStrategy, useClass: LocalizedTitleStrategy }
    ]
}).catch(console.error);
