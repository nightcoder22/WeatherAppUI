import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../models/User";
import {Temperature} from "../models/Temperature";
import {TemperatureService} from "../service/temperature.service";
import {AlertService} from "../service/alert.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : User;
  temperature: Temperature;

  constructor(private userService: UserService, private alertService: AlertService, private temperatureService : TemperatureService) {
    //assigning user value
    this.user = userService.currentUserValue;
  }

  /*
  * Get latest temperature and display
  * */
  ngOnInit(): void {
    this.temperatureService.getLatestTemperature().subscribe(
      data => {
        this.temperature = data;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }


}
