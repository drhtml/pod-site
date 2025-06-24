import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingService } from './services/loading.service';
import { LoadingModalModule } from './components/loading-modal/loading-modal.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BottomLinksModule } from './components/bottom-links/bottom-links.module';
import { ButtonModule } from './components/button/button.module';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatDialogModule,
        LoadingModalModule,
        MatSnackBarModule,
        BottomLinksModule,
        ButtonModule], providers: [LoadingService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
