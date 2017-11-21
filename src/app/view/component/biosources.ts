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
import { Observable } from 'rxjs';

@Component({
    selector: 'app-biosources-screen',
    templateUrl: './biosources.html'
})
export class BioSourcesScreenComponent implements OnDestroy {
    genomeSubscription: Subscription;
    biosourceSubscription: Subscription;

    sourceBioSources: BioSource[] = [];
    targetBioSources: BioSource[] = [];

    constructor(private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome === null) {
                return;
            }
            this.deepBlueService.listBioSources().subscribe(biosources => {
                this.sourceBioSources = biosources;
            });
        });


        this.biosourceSubscription = deepBlueService.selectedBioSourcesValue$.subscribe(biosources => {
            this.targetBioSources = biosources;

            let sourceBs = [];
            for (let source of this.sourceBioSources) {
                let found = false;
                for (let target of this.targetBioSources) {
                    if (source.id.id == target.id.id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    sourceBs.push(source);
                }
            }
            this.sourceBioSources = sourceBs;

            this.targetBioSources.sort((a: BioSource, b: BioSource) => a.name.localeCompare(b.name));
            this.sourceBioSources.sort((a: BioSource, b: BioSource) => a.name.localeCompare(b.name));
        });
    }

    onMoveToSource($event: any) {
        let items = $event.items;
        for (let item of items) {
            this.deepBlueService.removeSelectedBiosource(item);
        }
    }

    onMoveToTarget($event: any) {
        debugger;
        let items = $event.items;
        for (let item of items) {
            this.deepBlueService.addSelectedBiosource(item);
        }
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
        this.biosourceSubscription.unsubscribe();
    }
}
