import { SelectedData } from '../service/selecteddata';
import { ProgressElement } from '../service/progresselement';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'

import { MultiSelect } from 'primeng/primeng';

import {
    BioSource,
    EpigeneticMark,
    FullExperiment,
    FullMetadata,
    Genome,
    IdName
} from '../domain/deepblue';

import { DeepBlueService } from '../service/deepblue';

import {
    DeepBlueOperation,
    DeepBlueResult
} from '../domain/operations';


class Regions {

}

@Component({
    selector: 'regions-screen',
    templateUrl: './regions.screen.html'
})
export class RegionsScreen {

    //regions: Regions;
    topStackSubscription: Subscription;

    columns = []
    rows = []

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {
        this.topStackSubscription = this.selectedData.getActiveTopStackValue().subscribe((dataStackItem) => this.processRegions())
        this.processRegions();
    }

    isInteger(column_name: string): boolean {
        if (column_name == "CHROMOSOME") {
            return false;
        }

        if (column_name == "START") {
            return true;
        }
        if (column_name == "END") {
            return true;
        }

        return false;
    }

    convert(value: string, column_type: string): Object {
        if ((column_type == "string") || (column_type == "category")) {
            return value;
        }

        if (column_type == "double") {
            return parseFloat(value);
        }

        if (column_type == "integer") {
            return parseInt(value);
        }

        return value;
    }

    processRegions() {

        let actualData: DeepBlueOperation = this.selectedData.getCurrentOperation();
        if (actualData == null) {
            return;
        }

        this.deepBlueService.getInfo(actualData.data.id).subscribe((info: FullMetadata) => {
            this.progress_element.reset(4, 0);

            let format = info.format();
            let columns_types = info.columns();

            this.deepBlueService.getRegions(actualData, format, this.progress_element, 0).subscribe((regions: DeepBlueResult) => {
                this.progress_element.increment(0);

                this.columns = format.split(",").map((c) => {
                    return { 'name': c, 'prop': c.toLowerCase().replace("_", "") }
                });

                this.rows = regions.resultAsString().split("\n").map((x) => {
                    let row_values = x.split("\t");
                    let row = {};

                    for (var idx in columns_types) {
                        let column_name = columns_types[idx]["name"];
                        let v = row_values[idx];

                        row[column_name.toLowerCase().replace("_", "")] = this.convert(v, columns_types[idx]["column_type"])
                    }

                    return row;
                })

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

