import { SensorDataService } from './../../services/sensor-data.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
/* import * as Chart from 'chart.js'; */
Chart.defaults.global.defaultFontFamily = "Open Sans";


@Component({
  selector: 'app-temp-hum-detail',
  templateUrl: './temp-hum-detail.component.html',
  styleUrls: ['./temp-hum-detail.component.css']
})
export class TempHumDetailComponent implements OnInit, OnDestroy {

  constructor(private sensorDataService: SensorDataService, private route: ActivatedRoute) { }

  humStatisticData: any[];
  tempStatisticData: any[] = [0, 0, 0, 0, 0];
  fullData: any[] = [];
  clickedDeviceData: any = [];
  private fullDataSubscription: Subscription;
  clickedDeviceId: any;

  // Chart JS
  //chart: any[] = [];
  minValueFromStatistics: any;
  maxValueFromStatistics: any;

  // ng2-chart

  // Temp Chart ///////////////////////////////////////////////////////////////////////////////////////
  public tempChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false,
          max: this.minValueFromStatistics,
          min: this.maxValueFromStatistics,
        } 
        /* ticks: {
          beginAtZero: false,
          max: 35,
          min: 0,
        }  */
      }],
      xAxes: [{
          gridLines: {
          display: false
        }
      }]
    },
    legend: {
      position: 'top',
      labels: {
        boxWidth: 7,
        fontSize: 12,
        fontStyle: 'normal',
        usePointStyle: true
      }
    }
  };

  public tempChartLabels = ['-20s', '-15s', '-10s', '-5s', 'jetzt'];

  public tempChartType = 'line';

  public chartLegend = 'true';

  public tempChartData = [
    {data: this.tempStatisticData, label: 'Temperatur [°C]', backgroundColor: '#7EBFDB', borderColor: '#0082BB', pointBackgroundColor: '#0082BB'}
  ];

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Hum Chart ///////////////////////////////////////////////////////////////////////////////////////////
  public humChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false,
          max: this.minValueFromStatistics,
          min: this.maxValueFromStatistics
        }
      }],
      xAxes: [{
        gridLines: {
        display: false
      }
    }]
    },
    legend: {
      position: 'top',
      labels: {
        boxWidth: 7,
        fontSize: 12,
        fontStyle: 'normal',
        usePointStyle: true
      }
    }
  };

  public humChartLabels = ['-20s', '-15s', '-10s', '-5s', 'jetzt'];

  public humChartType = 'line';

  public humChartLegend = 'true';

  public humChartData = [
    {data: this.tempStatisticData, label: 'Luftfeuchtigkeit [%]', backgroundColor: '#7EBFDB', borderColor: '#0082BB', pointBackgroundColor: '#0082BB'}
  ];
  //////////////////////////////////////////////////////////////////////////////////////////////////////////


  ngOnInit(): void {

    this.fullDataSubscription = this.sensorDataService.getFullDataUpdateListener().subscribe((updatedFullData: any[]) => {
      // console.log('Neuer Log im Sensor Box Component: ' + JSON.stringify(updatedFullData));
      this.fullData = updatedFullData;
      // console.log('Updated full data: ' + updatedFullData);
      // console.log('Param: ' + this.clickedDeviceId);
      let index = this.getIndexOfSelectedDevice(updatedFullData, this.clickedDeviceId);
      // console.log('Gefundender Index: ' + index);
      this.clickedDeviceData = updatedFullData[index];
      //console.log('Gecklickte Daten: ' + JSON.stringify(this.clickedDeviceData));
    });

    this.route.paramMap.subscribe(params => {
      this.clickedDeviceId = params.get('deviceId');
      this.getStatistic(this.clickedDeviceId);
    });


    // Daten für Statistiken abrufen
    this.getStatistic(this.clickedDeviceId);
  }


  getIndexOfSelectedDevice(array: any[], deviceId: string) {
    let nameArray = [];
    for(let i = 0; i < array.length; i++) {
      nameArray.push(array[i].deviceId);
    }
    // console.log('Name Array: ' + nameArray);
    return nameArray.indexOf(deviceId);
  }


  // Statistiken Methode
  getStatistic(deviceId: string) {
    //console.log('Überegebene Device Id: ' + deviceId);
    this.sensorDataService.getStatisticForClickedDevice(deviceId)
      .subscribe(statisticDataServer => {
        console.log('Response: ' + JSON.stringify(statisticDataServer));
        this.tempStatisticData = statisticDataServer.tempStatistic;
        this.humStatisticData = statisticDataServer.humStatistic;
        // Chart erst dann zeichnen wenn Werte da sind
        //this.drawTempChart(this.tempStatisticData);
        this.updateTempData(this.tempStatisticData);
        this.updatehumData(this.humStatisticData);


      });
  }

  updateTempData(data: any[]) {
    console.log('Chart geupdated!');
    this.tempChartData[0].data = data;
    this.tempChartOptions.scales.yAxes[0].ticks.max = Math.max.apply(Math, data);
    this.tempChartOptions.scales.yAxes[0].ticks.min = Math.min.apply(Math, data);
  }

  updatehumData(data: any[]) {
    console.log('Chart geupdated!');
    this.humChartData[0].data = data;
    this.humChartOptions.scales.yAxes[0].ticks.max = Math.max.apply(Math, data);
    this.humChartOptions.scales.yAxes[0].ticks.min = Math.min.apply(Math, data);
  }

  /* drawTempChart(tempData) {
    this.chart = new Chart('canvas', {
      type: line

    }); */

    ngOnDestroy():void {
      this.fullDataSubscription.unsubscribe();
    }



}
