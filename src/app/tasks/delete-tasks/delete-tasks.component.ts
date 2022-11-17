import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';
import Swal from 'sweetalert2'
import { format } from 'date-fns'

export interface DialogData {
  id: string
  name: string
  date: string
  value: number
}
@Component({
  selector: 'app-delete-tasks',
  templateUrl: './delete-tasks.component.html',
  styleUrls: ['./delete-tasks.component.scss']
})
export class DeleteTasksComponent implements OnInit {

  constructor(
    @Optional() public dialogRef: MatDialogRef<DeleteTasksComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData, private taskService: TaskService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  formatarData(data: string){
    const dataFormat = new Date(data);
    return format(dataFormat, `dd/MM/yyyy`);
  }

  deletar(){
    this.taskService.deletar(this.data.id).subscribe(
      result => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Pagamento deletado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.dialogRef.close();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao deletar pagamento!',
        })
      }
    );
  }

}
