import { Component, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SelectedData } from 'app/service/selected-data';
import { ProgressElement } from 'app/service/progresselement';

import { Id } from 'app/domain/deepblue';
import { FullMetadata } from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';

import { DeepBlueResult } from 'app/domain/operations';

@Component({
    selector: 'regions-screen',
    templateUrl: './regions.html'
})
export class RegionsScreen {

    // regions: Regions;
    topStackSubscription: Subscription;

    columns: any[] = [];
    rows: any[] = [];
    request_id: Id = null;

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {
        this.topStackSubscription = this.selectedData.activeTopStackValue$.subscribe(_ => this.processRegions())
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

    generateUCSCExportLine(): string {
        if (!this.request_id) {
            return "";
        }

        let genome_name = this.deepBlueService.getGenome().name;
        const actualData = this.selectedData.getActiveCurrentOperation();
        const actual_request_id = this.request_id.id;
        let url = "http://deepblue.mpi-inf.mpg.de/api/composed_commands/generate_track_file?genome=" + genome_name + "&request_id=" + actual_request_id;
        console.debug("Download URL", url);
        let encodedUrl = encodeURIComponent(url);
        var ucscLink = "http://genome.ucsc.edu/cgi-bin/hgTracks?";
        ucscLink = ucscLink + "db=" + genome_name;
        ucscLink = ucscLink + "&hgt.customText=" + encodedUrl;
        return ucscLink;
    }

    generateDownloadLink(): string {
        if (!this.request_id) {
            return "";
        }
        const actual_request_id = this.request_id.id;
        // TODO: Get user key
        let url = "http://deepblue.mpi-inf.mpg.de/xmlrpc/download/?r=" + actual_request_id + "&key=anonymous_key";
        return url;
    }

    processRegions() {

        const actualData = this.selectedData.getActiveCurrentOperation();
        if (actualData == null) {
            return;
        }

        this.deepBlueService.getInfo(actualData.mainOperation().data().id()).subscribe((info: FullMetadata) => {
            this.progress_element.reset(4, 0);

            const format = info.format();
            const columns_types = info.columns();

            this.deepBlueService.getRegions(actualData, format).subscribe((regions: DeepBlueResult) => {
                this.request_id = regions.getRequestId();
                this.progress_element.increment(0);

                this.columns = format.split(",").map((c) => {
                    return { 'name': c, 'prop': c.toLowerCase().replace('_', '') }
                });

                this.rows = regions.resultAsString().split('\n').map((x) => {
                    const row_values = x.split('\t');
                    const row: { [key: string]: any } = {};

                    for (let idx = 0; idx < columns_types.length; idx++) {
                        const column_name: string = columns_types[idx]['name'];
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

