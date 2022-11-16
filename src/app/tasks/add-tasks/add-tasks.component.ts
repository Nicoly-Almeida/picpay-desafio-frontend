import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/model/task';
import Swal from 'sweetalert2'

export interface DialogData {
  id: string
}

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.scss']
})
export class AddTasksComponent implements OnInit {
  task: Task;

  constructor(
    public dialogRef: MatDialogRef<AddTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private TaskService: TaskService,
  ) {
    this.task = new Task('', '', '','', 0, '', '', false);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.TaskService.obterPorId(this.data.id).subscribe(
      task => {
        this.task.id = task.id;
        this.task.name = task.name;
        this.task.value = task.value;
        this.task.title = task.title;
        this.task.date = task.date;
        this.task.image = task.image;
        this.task.isPayed = task.isPayed;
        this.task.username = task.username;
      }
    );
    
  }
  

  salvar(){
    if (this.data.id) {
      this.TaskService.editar(this.task).subscribe(
        result => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Pagamento atualizado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.dialogRef.close();
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao atualizar pagamento!',
          })
        }
      );
    } else{
      if (this.task.name && this.task.value && this.task.date){
      this.TaskService.inserir(this.task).subscribe(
        task => {
          Swal.fire({
          icon: 'success',
          title: 'Pagamento cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 3000
        });
        this.dialogRef.close();
      },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao cadastrar pagamento!',
          })
        }
        );
    }
    }
  }
}
