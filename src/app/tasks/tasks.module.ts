import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { MaterialModule } from '../shared/material/material.module';
import { DeleteTasksComponent } from './delete-tasks/delete-tasks.component';


@NgModule({
  declarations: [
    ListTasksComponent,
    AddTasksComponent,
    DeleteTasksComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports:[ListTasksComponent]
})
export class TasksModule { }
