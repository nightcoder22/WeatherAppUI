import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Temperature} from "../models/Temperature";

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private currentTemperatureSubject: BehaviorSubject<Temperature>;
  public currentTemperature: Observable<Temperature>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentTemperatureSubject = new BehaviorSubject<Temperature>(JSON.parse(localStorage.getItem('currentTemperature')));
    this.currentTemperature = this.currentTemperatureSubject.asObservable();
  }

  public get currentTemperatureValue(): Temperature {
    return this.currentTemperatureSubject.value;
  }

  /*
  * Calls backend to get latest temperature
  * */
  getLatestTemperature() {
    return this.http.get<any>(`http://localhost:8080/temperature/latest`)
      .pipe(map(temperatureDetails => {
        if (temperatureDetails) {
          localStorage.setItem('currentTemperature', JSON.stringify(temperatureDetails));
          this.currentTemperatureSubject.next(temperatureDetails);
        }
        return temperatureDetails;
      }));
  }
}
