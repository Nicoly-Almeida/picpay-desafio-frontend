import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  login = {
    email : new FormControl('', [Validators.required, Validators.email]),
    senha : new FormControl('', [Validators.required])
  }


  constructor(private authenticationService: AuthenticationService , private router: Router) { }

  ngOnInit(): void {
  }
  
  auth(email: string, senha: string){
    this.authenticationService.login(email, senha)

  }


  formValid() {
    return this.login.email.valid && this.login.senha.valid;
  }
  

  getErrorEmailMessage() {
    if (this.login.email.hasError('required')) {
      return 'Você deve inserir um endereço de e-mail';
    }

    return this.login.email.hasError('email') ? 'Não é um email válido' : '';
  }
  getErrorSenhaMessage() {
    if (this.login.senha.hasError('required')) {
      return 'Você deve inserir uma senha';
    }

    return '' 
  }

}
