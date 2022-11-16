import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Account } from 'src/app/shared/model/account';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  listar(): Observable<Account[]>{
    return this.http.get<Account[]>(`${environment.api}/account`);
  }

  // Normalmente para fazer login eu realizo um post para
  // para o endpoint de autenticacao do back
  // após isso ele me retorna um token que eu utilizo para
  // manter o usuario logado
  // Mas como o JSON Server não tem autenticação
  // criei a lógica abaixo para simular o login
  login(login: any){
    this.listar().subscribe(resp => {
      resp.map((x)=> {
        if((x.email === login.email.value) && (x.password === login.senha.value)){
          window.localStorage.setItem('token', x.id);
          this.router.navigate(['']);
          return true;
        } 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário ou senha inválidos!',
        })
        return false
      }, 
      )
    });
    
  }
}
