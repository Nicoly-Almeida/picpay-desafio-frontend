import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.api}/tasks`);
  }

  inserir(task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(`${environment.api}/tasks`, task);
  }

  obterPorId(id: string): Observable<Task> {
    return this.http.get<Task>(`${environment.api}/tasks/${id}`);
  }

  editar(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.api}/tasks/${task.id}`, task);
  }

  deletar(id: string): Observable<Task> {
    return this.http.delete<Task>(`${environment.api}/tasks/${id}`);
  }
}
