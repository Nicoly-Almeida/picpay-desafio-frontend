import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Account } from 'src/app/shared/model/account';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

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
  login(email:string, senha:string) : boolean{
    this.listar().subscribe(item => {
      const account = item.find(x => x.email == email && x.password == senha);
      if(account){
        window.localStorage.setItem('user', JSON.stringify(account));
        this.router.navigate(['']);
        return true;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuário ou senha inválidos',
        })
      }
    })
    
    return false;
    
  }

  getUser(): string{
    return window.localStorage.getItem('user');
  }

  logout(){
    window.localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
