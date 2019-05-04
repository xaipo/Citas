import { Component, OnInit } from '@angular/core';
import {User} from '../models/User.model'
import {LoginService} from '../services/login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
   public user:User;
  public date:Date;
  token:any;
  constructor(public rest: LoginService

  ) {
this.user = new User();
this.date= new Date();

}

  ngOnInit() {
  }

  login(){
    console.log(this.user);
    this.rest.login(this.user).subscribe((data: {}) => {
      console.log(data);
      this.token = data;
    });
  }

}
