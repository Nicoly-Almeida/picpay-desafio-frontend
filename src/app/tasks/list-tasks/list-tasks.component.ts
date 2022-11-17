import { Component, OnInit, Optional, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { Task } from 'src/app/shared/model/task';
import { TaskService } from 'src/app/shared/services/task.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { DeleteTasksComponent } from '../delete-tasks/delete-tasks.component';
import { Page, PageRequest } from 'src/app/_util/pagination';
import { take } from "rxjs/operators";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns'
import { EventEmitterService } from 'src/app/shared/services/event-emitter.service';


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  tasks: Task[];
  displayedColumns: string[] = ['usuario', "titulo", "data", "valor", "pago", "acoes"];
  dataSource: MatTableDataSource<Task>;
  

  formGroupPesquisa: FormGroup;

  tituloCheck: boolean = false;
  dataCheck: boolean = false;

  page: Page<Task> = new Page([], 0);
  pageEvent: PageEvent;
  sortEvent: Sort;
  carregando = false;
  eventDelete: any = null;
  eventAdd: any = null
  eventEdit: any = null;
  deleteTask: string;
  addTask: Task;
  editTask: Task;

  toppings = new FormControl('');
  toppingList: string[] = ['Título', 'Data'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService: TaskService, @Optional() public dialog: 
  MatDialog,  @Optional() private formBuilder: FormBuilder) { 
    this.tasks = new Array<Task>();
  }

  ngOnInit(): void {
    this.eventDelete = EventEmitterService.get('deleteTask').subscribe(data => this.deleteTask = data)
    this.eventAdd = EventEmitterService.get('addTask').subscribe(data => this.addTask = data)
    this.eventEdit = EventEmitterService.get('editTask').subscribe(data => this.editTask = data)
    this.formGroupPesquisa = this.formBuilder.group({
      nome: [null],
    });
    this.listar();
  }

  ngOnDestroy() {
    if (this.eventDelete) this.eventDelete.unsubscribe();
    if (this.eventAdd) this.eventAdd.unsubscribe();
    if (this.eventEdit) this.eventEdit.unsubscribe();
  }

  formatarData(data: Date){
    data = new Date(data);
    return format(data, `dd/MM/yyyy`);
  }

  limparPesquisa() {
    this.formGroupPesquisa.reset();
    this.listar();
  }

  listar(){
    this.carregando = true;
    const queryAdicional = new Map();
    if (this.formGroupPesquisa.value.nome) {
      queryAdicional.set("name_like", this.formGroupPesquisa.value.nome);
    }
    this.taskService.listar(
      new PageRequest(
        {
            pageNumber: this.pageEvent ? this.pageEvent.pageIndex : 0,
            pageSize: this.pageEvent ? this.pageEvent.pageSize : 5,
        },
        {
            property: this.sortEvent ? this.sortEvent.active : "id",
            direction: this.sortEvent ? this.sortEvent.direction : "asc",
        },
        queryAdicional
    )
    ).pipe(take(1)).subscribe(
      page => {
        this.page = page;
        this.carregando = false;
      }
    ); 
  }

  openDialogDeletar(task: Task){
    const dialogRef = this.dialog.open(DeleteTasksComponent, {
      width: '400px',
      data: {id: task.id, name: task.name, value: task.value, date:task.date},
    })

    dialogRef.afterClosed().subscribe(data => {
      if (this.deleteTask){
        this.page.content = this.page.content.filter(item => item.id.toString() != task.id)
      }
    })
    };

  editPayed(task: Task){
    task.isPayed = !task.isPayed;
    this.taskService.editar(task).subscribe(
      result => {
        const item = this.page.content.filter(item => item.id.toString() == task.id)[0];
        item.isPayed = !item.isPayed;
      }
    )
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(AddTasksComponent, {
      data: {id: id},
    })

    dialogRef.afterClosed().subscribe(result => {
      if (this.editTask){
        const item = this.page.content.filter(item => item.id == this.editTask.id)[0];
        item.name = this.editTask.name;
        item.value = this.editTask.value;
        item.date = this.editTask.date;
        item.title = this.editTask.title;
      } else if (this.addTask){
        this.page.content.push(this.addTask)
      }
    });
  }
}