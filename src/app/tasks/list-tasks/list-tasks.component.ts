import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { Task } from 'src/app/shared/model/task';
import { TaskService } from 'src/app/shared/services/task.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { DeleteTasksComponent } from '../delete-tasks/delete-tasks.component';



@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  tasks: Task[];
  displayedColumns: string[] = ['usuario', "titulo", "data", "valor", "pago", "acoes"];
  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService: TaskService, public dialog: MatDialog, ) {
    this.tasks = new Array<Task>();
  }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.taskService.listar().subscribe(
      result => {
        this.tasks = result
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    ); 
  }

  openDialogDeletar(task: Task){
    const dialogRef = this.dialog.open(DeleteTasksComponent, {
      width: '400px',
      data: {id: task.id, name: task.name, value: task.value, date: task.date},
    })
    
    dialogRef.afterClosed().subscribe(result => {
      this.listar();
    });
  }

  editPayed(task: Task){
    task.isPayed = !task.isPayed;
    this.taskService.editar(task).subscribe(
      result => {
        this.listar();
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(AddTasksComponent, {
      data: {id: id},
    })

    dialogRef.afterClosed().subscribe(result => {
      this.listar();
    });
  }
}