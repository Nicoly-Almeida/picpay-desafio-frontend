import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { Page, QueryBuilder } from 'src/app/_util/pagination';
import { Item } from '../interfaces/item.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  listar(queryBuilder: QueryBuilder): Observable<Page<Item>> {
    return this.http
    .get<Item[]>(`${environment.api}/tasks?${queryBuilder.buildQueryString()}`, {observe: 'response'})
    .pipe(
        map(response => <Page<Item>>Page.fromResponse(response))
    );
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
