import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from './../../../environments/environment';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('chamar metodo e listar todos os usuarios pedidos', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.listar();
    expect(spy).toHaveBeenCalledWith(`${environment.api}/account`);
  });

  it('Usuário ou senha válido(s)', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service.login('dotnet', 'usuario')).toBeFalsy();
  }));

});
