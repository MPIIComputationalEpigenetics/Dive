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

import { PickList } from 'primeng/primeng';

import { DeepBlueService } from '../service/deepblue';

@Component({
    selector: 'biosources-screen',
    templateUrl: 'app/demo/view/biosources.screen.html'
})
export class BioSourcesScreen {
    genomeSubscription: Subscription;

    sourceBioSources: BioSource[] = [];
    targetBioSources: BioSource[] = [];

    pickList

    @ViewChild('picklist') picklist: PickList;

    constructor(private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            this.deepBlueService.getBioSources().subscribe(biosources => {
                this.targetBioSources = biosources;
            })
        })
    }

    onMoveToSource($event) {
        console.log(this.targetBioSources);
        this.deepBlueService.setSelectedBioSources(this.targetBioSources);
    }


    onMoveToTarget($event) {
        console.log(this.targetBioSources);
        this.deepBlueService.setSelectedBioSources(this.targetBioSources);
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}