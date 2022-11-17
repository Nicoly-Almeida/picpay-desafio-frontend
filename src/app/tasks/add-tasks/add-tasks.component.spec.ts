import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTasksComponent } from './add-tasks.component';

describe('AddTasksComponent', () => {
  let component: AddTasksComponent;
  let fixture: ComponentFixture<AddTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTasksComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.data.id = '2'
  });


  // it('submitting a form emits a user', () => {
  //   expect(component.data).toBeFalsy();
  //   component.data['id'] = "";
  //   component.data['name'] = "Pagamento Teste";
  //   component.data['data'] = "2022-11-25T03:00:00.000Z";
  //   component.data['value'] = 35;

  //   // Subscribe to the Observable and store the user in a local variable.
  //   component.salvar()
  // });

  // it('validacao do campo name', () => {
  //   let name = component.task.name; (1)
  //   expect(name).toBeFalsy(); (2)
  // });

  // it('validacao do campo valor', () => {
  //   let value = component.task.value; (1)
  //   expect(value).toBeFalsy(); (2)
  // });

  // it('validacao do campo data', () => {
  //   let date = component.task.date; (1)
  //   expect(date).toBeFalsy(); (2)
  // });

});
