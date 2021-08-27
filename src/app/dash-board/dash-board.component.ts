import { BaseAppService } from './../Service/base-app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  data: any = [];

  constructor(private baseService: BaseAppService) {}

  ngOnInit(): void {
    this.getWeatherReport();
  }

  getWeatherReport() {
    const cities = ['London', 'Paris', 'Lagos', 'Benin'];
    cities.filter((city) => {
      this.baseService.get(city).subscribe(
        (obs) => {
          this.data.push(obs);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
