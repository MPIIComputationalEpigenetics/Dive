import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { OverlapsBarChartComponent } from '../component/charts/overlappingbar';
import { Subscription } from 'rxjs/Subscription';

import { MultiSelect } from 'primeng/primeng';

import { Dropdown, SelectItem } from 'primeng/primeng';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { BioSource, EpigeneticMark, FullExperiment, Genome, GeneModel } from 'app/domain/deepblue';

import { DataStackItem } from 'app/service/datastack';
import { DeepBlueService } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { ProgressElement } from 'app/service/progresselement';

import { DeepBlueOperation, DeepBlueMiddlewareRequest } from 'app/domain/operations';
import { DeepBlueResult, DeepBlueMiddlewareOverlapEnrichtmentResult, DeepBlueMiddlewareOverlapEnrichtmentResultItem, DeepBlueMiddlewareGOEnrichtmentResult } from 'app/domain/operations';
import { IOperation, IRow } from 'app/domain/interfaces';
import { Utils } from 'app/service/utils';
import { RequestManager } from 'app/service/requests-manager';

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

        this.deepBlueService
            .composedCalculateOverlapsEnrichment(current, this.selected_data.id(), this.selected_datasets).subscribe((request: DeepBlueMiddlewareRequest) => {
                this.requestManager.enqueueRequest(request);
                this.deepBlueService.getComposedResultIterator(request, this.progress_element, 'overlaps_enrichment')
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
