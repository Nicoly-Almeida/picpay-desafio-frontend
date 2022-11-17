import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTasksComponent } from './delete-tasks.component';

describe('DeleteTasksComponent', () => {
  let component: DeleteTasksComponent;
  let fixture: ComponentFixture<DeleteTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DeleteTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});