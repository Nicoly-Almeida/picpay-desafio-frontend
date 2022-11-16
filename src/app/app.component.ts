import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: string;
  mostrarMenu: boolean = false;

  ngOnInit() {
   this.title = 'Desafio Picpay Front-end';
   this.mostrarMenu = localStorage.getItem('token') ? true : false;
  }
}
