import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import this
import { MatInputModule } from '@angular/material/input'; // Import this
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InitialComponent } from './initial/initial.component';

import { MaleComponent } from './male/male.component';
import { FemaleComponent } from './female/female.component';
import {MatListModule} from '@angular/material/list';
import { ExerciseComponent } from './exercise/exercise.component';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NewsComponent } from './news/news.component';
import { CarouselModule } from 'ngx-bootstrap/carousel'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    MaleComponent,
    FemaleComponent,
    ExerciseComponent,
    NewsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule, // Add this to imports
    MatInputModule, 
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule, MatSnackBarModule,MatListModule,MatSelectModule,MatIconModule,CarouselModule.forRoot()
       // Add this to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
