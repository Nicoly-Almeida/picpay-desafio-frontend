import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { AddTasksComponent } from './tasks/add-tasks/add-tasks.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DeleteTasksComponent } from './tasks/delete-tasks/delete-tasks.component';


@NgModule({
  declarations: [	
    AppComponent, ListTasksComponent, HomeComponent, LoginComponent, AddTasksComponent, NavbarComponent, DeleteTasksComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    HttpClientModule

  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
