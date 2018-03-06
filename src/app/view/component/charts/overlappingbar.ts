import { DeepBlueService } from '../../../service/deepblue';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-overlaps-bar-chart',
    styles: [`
      chart {
        display: block;
      }
    `],
    template: `
        <chart [options]="options" (load)="saveInstance($event.context)"></chart>
    `
})
export class OverlapsBarChartComponent {
    options: Object;
    chart: any;
    chart2: any; // Backup for when exporting the data.
    result_by_dataset_stack: any;

    @Output() dataSelected = new EventEmitter();

    setNewData(categories: any, series: any, result_by_dataset_stack: any) {

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
                serie['point']['events']['click'] = (ev: any) => this.clickExperimentBar(ev);
                serie['dataLabels'] = dataLabels;
                serie['borderWidth'] = 0;
                serie['animation'] = false;
                this.chart['addSeries'](serie, false);
            } else if (serie['type'] === 'boxplot') {
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
        if (!this.chart) {
            this.chart = chartInstance;
        }
    }

    constructor(private deepBlueService: DeepBlueService) {
        this.options = {
            title: {
                text: `Overlapping with ${deepBlueService.getDivingData() ? deepBlueService.getDivingData().data().name() : ""}`
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
            /*
            tooltip: {
                formatter: function () {
                    var s;
                    if (this.point.key) {
                        s = "<em>Experiment No " + this.point.key + "</em><br/>";
                    }
                    if (this.point.name) { // the pie chart
                        s = this.point.name + ' ' + this.y + ' fruits';
                    } else {
                        s = this.series.name + ' : ' +
                            this.x + ': ' + this.y;
                    }
                    return s;
                }
            },
            */
            series: []
        };
    }

    clickExperimentBar(click: any) {
        const point = click.point;
        const category = point.category;
        const index = point.series.columnIndex;

        // TODO: create a type to hold this data
        const bar_element: any = this.result_by_dataset_stack[category][point.series.columnIndex];
        this.dataSelected.emit(bar_element);
    }
}
