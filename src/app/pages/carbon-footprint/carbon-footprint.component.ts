import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Highcharts from 'highcharts';
import { Options } from 'highcharts';
import { Subscription, debounceTime, filter } from 'rxjs';
import { CarbonFootprintStepperComponent } from 'src/app/components/carbon-footprint-stepper/carbon-footprint-stepper.component';
import { CarbotFootprintOffsetComponent } from 'src/app/components/carbot-footprint-offset/carbot-footprint-offset.component';
import { CarbonFootprintService } from 'src/app/services/carbon-footprint.service';


@Component({
  selector: 'app-carbon-footprint',
  templateUrl: './carbon-footprint.component.html',
  styleUrls: ['./carbon-footprint.component.css']
})


export class CarbonFootprintComponent implements OnInit {

  dateRangeForm: FormGroup;
  subscription: Subscription;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private carbonService: CarbonFootprintService) {
    this.dateRangeForm = this.fb.group({
      start: [null],
      end: [null]
    });
  }

  totalFootprint: Options;

  topEmissions: Options;

  carbonOffset: Options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: {
      text: 'C02/Offset'
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    series: [
      {
        type: 'pie',
        name: 'CO2/Offset',
        data: [{
          name: 'C02',
          y: 88.00,
        },
        ['Offset', 12],

        ]
      },
    ],
  }

  Highcharts: typeof Highcharts = Highcharts;
  ngOnInit(): void {
    this.subscription = this.dateRangeForm.valueChanges
      .pipe(
        debounceTime(300), // optional
        filter(({ start, end }) => start !== null && end !== null)
      )
      .subscribe(({ start, end }) => {
        this.initiateTotalCarbonFootprint(start, end);
        this.initiateTopEmissions(start,end);

      });
  }


  initiateTotalCarbonFootprint(start: Date, end: Date) {
    this.carbonService.getCarbonFootprintsByMonthAndYear(start.toISOString().split('T')[0], end.toISOString().split('T')[0]).subscribe(data => {
      const categories: string[] = data.map(entry => `${entry.month}-${entry.year}`);
      const carData: number[] = data.map(entry => entry.carEmission);
      const transitData: number[] = data.map(entry => entry.transitEmission);
      const planeData: number[] = data.map(entry => entry.planeEmission);
      const energyData: number[] = data.map(entry => entry.energyEmission);
      const foodData: number[] = data.map(entry => entry.foodEmission);
      const fuelData: number[] = data.map(entry => entry.fuelEmission);


      this.totalFootprint = {
        chart: { type: 'column' },
        title: {
          text: 'Carbon Footprint',
          align: 'left'
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
            text: 'Tons'
          }
        },
        tooltip: {
          pointFormat: '<b>{key}</b><br/>{series.name}: {y}<br/>' +
            'Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal'
          }
        },
        series: [
          {
            name: 'Car',
            data: carData,
            type: 'column'
          },
          {
            name: 'Public Transit',
            data: transitData,
            type: 'column'
          },
          {
            name: 'Plane',
            data: planeData,
            type: 'column'
          },
          {
            name: 'Energy',
            data: energyData,
            type: 'column'
          },
          {
            name: 'Food',
            data: foodData,
            type: 'column'
          },
          {
            name: 'Fuel',
            data: fuelData,
            type: 'column'
          }
        ]
      };

    })
  }

  initiateTopEmissions(start: Date, end: Date) {
    this.carbonService.getTopEmissions(start.toISOString().split('T')[0], end.toISOString().split('T')[0]).subscribe(data => {
      console.log("DATA",data);
      const pieData: any[] = [];
      const percentages: { [key: string]: number } = {}; // Create the dictionary
  
      for (const [key, value] of Object.entries(data)) {
        const percentage = Math.round(value * 100);
        pieData.push({name: key, y:percentage});
        percentages[key] = percentage; 
      }

      console.log("PIE:",pieData);
      this.topEmissions = {
        title: {
          text: 'Top Emissions by Percentage',
          align: 'center'
        },
        legend: {
          enabled: true,
          labelFormatter: function () {
            // Use the name to fetch the corresponding percentage from the dictionary
            return `${this.name}: ${percentages[this.name] || 0}%`;
          }
        },
        plotOptions: {
          pie: {
            innerSize: '80%',
            showInLegend: true
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: false,
              format: '<b>{point.name}</b>: {point.percentage:.0f} %',
              crop: false,
              style: {
                fontWeight: 'bold',
                fontSize: '10px'
              }
            }
          }
        },
        colors: ['#FCE700', '#F8C4B4', '#f6e1ea', '#B8E8FC', '#BCE29E','#BBB'],
        series: [
          {
            type: 'pie',
            name: 'co2',
            data: pieData
          }
        ]
      };    

    });
  }


  openFootprintDialog() {
    const dialogRef = this.dialog.open(CarbonFootprintStepperComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog is closed');
    })
  }

  openFootprintOffsetDialog() {
    const dialogRef = this.dialog.open(CarbotFootprintOffsetComponent, {
      width: '2000px'
    })
  }

  
}
