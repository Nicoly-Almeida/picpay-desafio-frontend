import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Account } from 'src/app/shared/model/account';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulário inválido quando vazio', () => {
    expect(component.formValid()).toBeFalsy();
  });

  it('validacao do campo senha', () => {
    let errors = {};
      let senha = component.login['senha'];
      expect(senha.valid).toBeFalsy();

      // Senha field is required
      errors = senha.errors || {};
      expect(errors['required']).toBeTruthy();

      // Set senha to something
      senha.setValue("test");
      errors = senha.errors || {};
      expect(errors['required']).toBeFalsy();

      // Set senha to something correct
      senha.setValue("usuario");
      errors = senha.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();
  });

  it('validacao do campo email', () => {
    let errors = {};
        let email = component.login['email'];
        expect(email.valid).toBeFalsy();

        // Email field is required
        errors = email.errors || {};
        expect(errors['required']).toBeTruthy();

        // Set email to something
        email.setValue("test");
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();

        // Set email to something correct
        email.setValue("usuario@gmail.com");
        errors = email.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeFalsy();
  });

  it('Submetendo um formulario de login', () => {
    expect(component.formValid()).toBeFalsy();
    component.login['email'].setValue("usuario@gmail.com");
    component.login['senha'].setValue("usuario");
    expect(component.login).toBeTruthy();
    
    component.auth(component.login.email.value, component.login.senha.value)
  });
});
