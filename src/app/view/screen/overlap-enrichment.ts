import { Component, OnDestroy } from '@angular/core';

import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';

import { DeepBlueMiddlewareRequest } from 'app/domain/operations';
import { DeepBlueMiddlewareOverlapEnrichtmentResult, DeepBlueMiddlewareOverlapEnrichtmentResultItem } from 'app/domain/operations';
import { IOperation, IRow } from 'app/domain/interfaces';
import { Utils } from 'app/service/utils';
import { RequestManager } from 'app/service/requests-manager';
import { SelectedData } from 'app/service/selected-data';

@Component({
    templateUrl: './overlap-enrichment.html'
})
export class OverlapEnrichmentScreenComponent implements OnDestroy {

    selected_data: IOperation;
    selected_datasets: Object[];

    enrichment_data: Object[][] = new Array<Object[]>();
    enrichment_data_from_server: Object[][] = new Array<DeepBlueMiddlewareOverlapEnrichtmentResultItem[]>();

    columns = DeepBlueMiddlewareOverlapEnrichtmentResultItem.asColumns();

    constructor(private deepBlueService: DeepBlueService, public requestManager: RequestManager,
        public progress_element: ProgressElement, public selectedData: SelectedData) {

    }

    selectQuery(event: IOperation) {
        this.selected_data = event;
    }

    selectDatasets(event: Object[]) {
        this.selected_datasets = event;
    }

    process() {
        const current: IOperation[] = this.selectedData.getStacksTopOperation();

        this.deepBlueService.composedCalculateOverlapsEnrichment(current, this.selected_data.id(), this.selected_datasets)
            .subscribe((request: DeepBlueMiddlewareRequest) => {
                this.requestManager.enqueueRequest(request);
                this.deepBlueService.getComposedResultIterator(request, 'overlaps_enrichment')
                    .subscribe((result: DeepBlueMiddlewareOverlapEnrichtmentResult[]) => {
                        this.prepare_data(result);
                    });
            });

    }

    prepare_data(datum: DeepBlueMiddlewareOverlapEnrichtmentResult[]) {

        this.enrichment_data_from_server = [];

        for (let pos = 0; pos < datum.length; pos++) {
            const data = datum[pos];
            const rows: Object[] = data.getResults().map((x: DeepBlueMiddlewareOverlapEnrichtmentResultItem) => {
                const row: IRow = {};
                for (let idx = 0; idx < this.columns.length; idx++) {
                    const column_name = this.columns[idx].name;
                    const v = x.data[column_name];
                    row[column_name.toLowerCase().replace(/_/g, '')] = Utils.convert(v, this.columns[idx]['column_type'])
                }
                return row;
            });

            rows.sort((a: IRow, b: IRow) => a['meanrank'] - b['meanrank']);

            this.enrichment_data_from_server.push(rows);
        }

        this.filter_enrichment_data(null);
    }

    filter_enrichment_data($event: any) {
        const newResults = [];
        for (let idx = 0; idx < this.enrichment_data_from_server.length; idx++) {
            //const x = this.filter_enrichment_datei(this.enrichment_data_from_server[idx]);
            const x = this.enrichment_data_from_server[idx];
            newResults.push(x);
        }

        this.enrichment_data = newResults;
        //this.plotBar();
    }

    ngOnDestroy() { }

}
