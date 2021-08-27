import { BaseAppService } from './../Service/base-app.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input() data: any;
  getData: any;
  img: string;
  max_temp: any = 0;
  min_temp: any = 0;
  chartDatasets: any;
  feel_temp: any;
  constructor(private baseService: BaseAppService) {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.getData = this.data as any;
    console.log('data', this.getData);
    this.min_temp = this.getData.main['temp_min'];
    this.max_temp = this.getData.main['temp_max'];
    this.feel_temp = this.getData.main['feels_like'];
    this.chartDatasets = [
      {
        data: [this.min_temp, this.max_temp, this.feel_temp],
        label: 'My First dataset',
      },
    ];
    this.getData.weather.filter((obs) => {
      switch (obs.icon) {
        case '01d':
          this.img = '../../assets/day.svg';
          break;
        case '01n':
          this.img = '../../assets/night.svg';
          break;
        case '02d':
          this.img = '../../assets/cloudy-day-1.svg';
          break;
        case '02n':
          this.img = '../../assets/cloudy-night-3.svg';
          break;
        case '03d':
          this.img = '../../assets/cloudy-day-1.svg';
          break;
        case '03n':
          this.img = '../../assets/cloudy-night-3.svg';
          break;
        case '04d':
        case '04n':
          this.img = '../../assets/cloudy.svg';
          break;
        case '09d':
        case '09n':
          this.img = '../../assets/rainy-4.svg';
          break;
        case '10d':
          this.img = '../../assets/rainy-3.svg';
          break;
        case '10n':
          this.img = '../../assets/rainy-6.svg';
          break;
        case '11d':
        case '11n':
          this.img = '../../assets/thunder.svg';
          break;
        case '13d':
        case '13n':
          this.img = '../../assets/snowy-6.svg';
          break;
        default:
          this.img = '../../assets/snowy-1.svg';
      }
    });
  }

  public chartType: string = 'line';

  public chartLabels: Array<any> = ['Min-temp', 'Max-temp', 'Feels-like'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .3)',
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
  };
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}
}
