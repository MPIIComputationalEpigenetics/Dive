import {
    Component,
    ViewChild,
    OnInit,
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import {
    Annotation,
    BioSource,
    EpigeneticMark,
    Experiment,
    Genome,
    IdName,
    ProgressElement
} from '../domain/deepblue';

import { DeepBlueService } from '../service/deepblue';

@Component({
    selector: 'biosources-screen',
    templateUrl: './biosources.screen.html'
})
export class BioSourcesScreen {
    genomeSubscription: Subscription;

    sourceBioSources: BioSource[] = [];
    targetBioSources: BioSource[] = [];

    constructor(private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome.id == "") {
                return;
            }
            this.deepBlueService.getBioSources().subscribe(biosources => {
                this.targetBioSources = biosources;
                this.deepBlueService.setSelectedBioSources(this.targetBioSources);
            })
        })
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