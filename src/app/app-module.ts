import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MatDividerModule } from '@angular/material/divider';
import { environment } from '../environments/environment';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { Header } from './shared/header/header';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Home } from './pages/home/home';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GistCards } from './pages/home/gist-cards/gist-cards';
import { GistTable } from './pages/home/gist-table/gist-table';
import { ViewToggle } from './pages/home/view-toggle/view-toggle';
import { TimeAgoPipe } from './pipes/time-ago-pipe';
import { Logo } from './shared/header/logo/logo';
import { SearchBar } from './shared/header/search-bar/search-bar';
import { UserMenu } from './shared/header/user-menu/user-menu';

@NgModule({
  declarations: [
    App,
    Header,
    Home,
    TimeAgoPipe,
    Logo,
    SearchBar,
    UserMenu,
    GistTable,
    ViewToggle,
    GistCards,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatCardModule,
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
