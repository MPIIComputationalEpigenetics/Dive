import { OverlapsBarChartComponent } from '../component/charts/overlappingbar';
import { DeepBlueMiddlewareGOEnrichtmentResult, DeepBlueMiddlewareOverlapResult } from '../../domain/operations';
import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
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

import { DeepBlueOperation } from 'app/domain/operations';
import { DeepBlueResult, DeepBlueMiddlewareOverlapEnrichtmentResult } from 'app/domain/operations';
import { IOperation } from 'app/domain/interfaces';

@Component({
    templateUrl: './overlap_enrichment.html'
})
export class OverlapEnrichmentScreenComponent implements OnDestroy {

    selected_data: IOperation;
    selected_datasets: Object;

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

    }

    selectQuery(event) {
        this.selected_data = event;
        console.log(this.selected_data);
    }

    selectDatasets(event) {
        this.selected_datasets = event;
        console.log(this.selected_datasets);
    }


    process() {
        const current: DeepBlueOperation[] = this.selectedData.getStacksTopOperation();

        this.deepBlueService
            .composedCalculateOverlapsEnrichment(current, this.selected_data.queryId(), this.selected_datasets)
            .subscribe((request_id: string) => {
                console.log('request_id from middleware', request_id);

                this.deepBlueService.getComposedResultIterator(request_id, this.progress_element, 'overlaps_enrichment')
                    .subscribe((result: DeepBlueMiddlewareOverlapEnrichtmentResult[]) => {
                        debugger;
                        console.log(result);
                    });
            });

    }

    ngOnDestroy() {

    }

}
