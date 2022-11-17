import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Account } from 'src/app/shared/model/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Account

  constructor(private authenticationService : AuthenticationService) {  } 

  ngOnInit(): void {
    this.user = JSON.parse(this.authenticationService.getUser())
  }

}
