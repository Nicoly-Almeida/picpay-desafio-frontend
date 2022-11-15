import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';



@NgModule({
  declarations: [
    ListTasksComponent,
    AddTasksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TasksModule { }
