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

@Component({
    selector: 'app-enrichment-database-component',
    template: `
    <div class="card card-w-title">
        <h1>Select the databases that you wish to use for enrichment</h1>
        <p-pickList #picklist
                [source]="sourceDatabases"
                [target]="targetDatabases"
                sourceHeader="Available"
                targetHeader="Selected"
                [responsive]="true">

            <ng-template let-database pTemplate="item">
                <span>{{database[0]}} ({{database[1].length}})</span>
            </ng-template>

        </p-pickList>
    </div>
    `
})
export class OverlapDatabaseSeletionComponent implements OnDestroy {
    genomeSubscription: Subscription;

    sourceDatabases: [string, string[]][] = [];
    targetDatabases: [string, string[]][] = [];

    constructor(private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome.id === '') {
                return;
            }
            this.deepBlueService.composedOverlapEnrichmentDatabase(genome).subscribe(databases => {
                this.sourceDatabases = databases;
            });
        });
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}


@Component({
    templateUrl: './overlap_enrichment.html'
})
export class OverlapEnrichmentScreenComponent implements OnDestroy {

    constructor(private deepBlueService: DeepBlueService,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

    }

    ngOnDestroy() {

    }
}
