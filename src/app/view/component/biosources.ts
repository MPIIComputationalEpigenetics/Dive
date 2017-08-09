import {
    Component,
    ViewChild,
    OnInit,
    OnDestroy,
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import {
    Annotation,
    BioSource,
    EpigeneticMark,
    Experiment,
    Genome,
    IdName,
} from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';

@Component({
    selector: 'app-biosources-screen',
    templateUrl: './biosources.html'
})
export class BioSourcesScreenComponent implements OnDestroy {
    genomeSubscription: Subscription;

    sourceBioSources: BioSource[] = [];
    targetBioSources: BioSource[] = [];

    constructor(private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome.id === '') {
                return;
            }
            this.deepBlueService.listBioSources().subscribe(biosources => {
                this.sourceBioSources = biosources;
            });
        });
    }

    onMoveToSource($event) {
        this.deepBlueService.setSelectedBioSources(this.targetBioSources);
    }


    onMoveToTarget($event) {
        this.deepBlueService.setSelectedBioSources(this.targetBioSources);
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}
