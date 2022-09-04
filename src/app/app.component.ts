import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { User } from './models/User';
import {UserService} from "./service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherAppUI';
  currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
