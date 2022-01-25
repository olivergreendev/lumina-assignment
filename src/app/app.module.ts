import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DeleteUserDialog } from './components/user-data/user-data.component';
import { AddMovieDialog } from './components/user-data/user-data.component';
import { DeleteMovieDialog } from './components/user-data/user-data.component';

import { MinutesToHoursPipe } from './pipes/min2hourspipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserDataComponent,
    MinutesToHoursPipe,
    CreateUserComponent,
    DeleteUserDialog,
    AddMovieDialog,
    DeleteMovieDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
