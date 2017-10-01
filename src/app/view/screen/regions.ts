import { Component, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';
import { MultiSelect } from 'primeng/primeng';

import { SelectedData } from 'app/service/selecteddata';
import { ProgressElement } from 'app/service/progresselement';

import { IdName } from 'app/domain/deepblue';
import { BioSource } from 'app/domain/deepblue';
import { EpigeneticMark } from 'app/domain/deepblue';
import { FullExperiment } from 'app/domain/deepblue';
import { FullMetadata } from 'app/domain/deepblue';
import { Genome } from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';

import { DeepBlueOperation } from 'app/domain/operations';
import { DeepBlueResult } from 'app/domain/operations';

@Component({
    selector: 'regions-screen',
    templateUrl: './regions.html'
})
export class RegionsScreen {

    // regions: Regions;
    topStackSubscription: Subscription;

    columns : any[] = [];
    rows : any[] = [];

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {
        this.topStackSubscription = this.selectedData.getActiveTopStackValue().subscribe((dataStackItem) => this.processRegions())
        this.processRegions();
    }

    isInteger(column_name: string): boolean {
        if (column_name === 'CHROMOSOME') {
            return false;
        }

        if (column_name === 'START') {
            return true;
        }
        if (column_name === 'END') {
            return true;
        }

        return false;
    }

    convert(value: string, column_type: string): Object {
        if ((column_type === 'string') || (column_type === 'category')) {
            return value;
        }

        if (column_type === 'double') {
            return parseFloat(value);
        }

        if (column_type === 'integer') {
            return parseInt(value);
        }

        return value;
    }

    processRegions() {

        const actualData: DeepBlueOperation = this.selectedData.getActiveCurrentOperation();
        if (actualData == null) {
            return;
        }

        this.deepBlueService.getInfo(actualData.dataId()).subscribe((info: FullMetadata) => {
            this.progress_element.reset(4, 0);

            const format = info.format();
            const columns_types = info.columns();

            this.deepBlueService.getRegions(actualData, format, this.progress_element, 0).subscribe((regions: DeepBlueResult) => {
                this.progress_element.increment(0);

                this.columns = format.split(",").map((c) => {
                    return { 'name': c, 'prop': c.toLowerCase().replace('_', '') }
                });

                this.rows = regions.resultAsString().split('\n').map((x) => {
                    const row_values = x.split('\t');
                    const row : {[key: string]: any} = {};

                    for (let idx = 0; idx < columns_types.length; idx++) {
                        const column_name : string = columns_types[idx]['name'];
                        const v = row_values[idx];

                        row[column_name.toLowerCase().replace('_', '')] = this.convert(v, columns_types[idx]['column_type'])
                    }

                    return row;
                });

                this.progress_element.increment(0);
            })
        });

    }

    ngOnDestroy() {
        this.topStackSubscription.unsubscribe();
        this.columns = [];
        this.rows = [];
    }
}

