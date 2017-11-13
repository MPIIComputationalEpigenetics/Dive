
import { DeepBlueService } from '../../../service/deepblue';
import { Component } from '@angular/core';

@Component({
    selector: 'app-similarity-bar-chart',
    styles: [`
      chart {
        display: block;
      }
    `],
    template: `
        <chart [options]="options" (load)="saveInstance($event.context)">></chart>
    `
})
export class SimilarityBarChartComponent {
    options: Object;
    chart: any;
    result_by_dataset_stack: any;

    setNewData(categories: any, series: any, result_by_dataset_stack: any) {

        debugger;


        this.result_by_dataset_stack = result_by_dataset_stack;

        this.chart['xAxis'][0].setCategories(categories, false);

        const point = {
            events: {
                click: function (click: any, e: any) {
                    // dummy function
                }
            }
        };

        const dataLabels = {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '12px',
                fontFamily: 'Verdana, sans-serif'
            }
        };

        while (this.chart['series'].length > 0) {
            this.chart['series'][0].remove(false);
        }

        for (const serie of series) {
            if (serie['type'] === 'column') {
                serie['point'] = point;
                serie['dataLabels'] = dataLabels;
                serie['borderWidth'] = 0;
                serie['animation'] = false;
                this.chart['addSeries'](serie, false);
            } else if (serie['type'] === 'boxplot') {
                console.log('bloxplot');
                serie['tooltip'] = { headerFormat: '<em>Experiment No {point.key}</em><br/>' };
                serie['backgroundColor'] = 'red';
                serie['animation'] = false;
                this.chart['addSeries'](serie, false);
            }
        }

        this.chart['redraw']();
    }

    hasData(): boolean {
        if (!this.chart) {
            return false;
        }
        return this.chart['series'][0]['data'].length > 0;
    }

    saveInstance(chartInstance: any) {
        this.chart = chartInstance;
    }

    constructor(private deepBlueService: DeepBlueService) {
        this.options = {
            title: {
                text: `Stuff`
            },
            xAxis: {
                categories: []
            },
            credits: {
                enabled: false
            },
            width: null,
            height: null,
            yAxis: {
                min: 0,
                title: {
                    text: 'Overlaped peaks (regions)'
                }
            },
            legend: {
                enabled: false
            },
            series: []
        }
    }
}
