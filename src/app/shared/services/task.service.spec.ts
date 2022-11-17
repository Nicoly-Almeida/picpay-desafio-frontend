import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../model/task';
import { environment } from './../../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HttpClient]
    });
    service = TestBed.inject(TaskService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('chamar metodo para cadastrar uma nova', () => {
    const spy = spyOn(http, 'post').and.callThrough();
    const task: Task = {
      id: '',
      title: 'Task Tesk',
      name: 'Task 1',
      username: 'Task1',
      image: 'https://www.google.com.br/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      value: 100,
      isPayed: false,
      date: "2022-11-25T03:00:00.000Z"
    }
    service.inserir(task);
    expect(spy).toHaveBeenCalledWith(`${environment.api}/tasks`, task);
  });
});
