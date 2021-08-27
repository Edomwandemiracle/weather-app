import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseAppService {
  private apiBaseUrl: string = 'http://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {}
  get(city) {
    return this.http.get(
      this.apiBaseUrl +
        `weather?q=${city}&units=metric&APPID=560bb2c57ded87f1a11a3957a9f5aab8`
    );
  }
}
