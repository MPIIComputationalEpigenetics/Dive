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
import { DeepBlueResult } from 'app/domain/operations';
import { IOperation } from 'app/domain/interfaces';

@Component({
    templateUrl: './overlap_enrichment.html'
})
export class OverlapEnrichmentScreenComponent implements OnDestroy {

    selected_data : IOperation;

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

    }

    selectQuery(event) {
        this.selected_data = event;
        console.log(this.selected_data);
    }

    ngOnDestroy() {

    }

}
