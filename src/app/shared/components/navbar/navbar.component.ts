import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Account } from '../../model/account';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: Account

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.authenticationService.getUser())
  }

  logout(){
    this.authenticationService.logout()
  }

}
